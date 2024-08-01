import React, { useEffect, useState }  from "react";
import { Asset, PriceLevel, TransientPriceLevel } from "../.././../models";
import InfoTooltip from "../../../components/controls/infoTooltip";
import { calculateRemainingAsset, filterPriceLevelsWithoutRevenue, getNewPriceLevel } from "../../../utilities/scenario";
import NumberInput from "../../../components/controls/numberInput";
import useDeepCompareEffect from "../../../hooks/useDeepCompareEffect";
import "./priceLevelInput.less";

interface PriceLevelInputProps {
	asset: Asset;
	priceLevelBeingEdited?: PriceLevel;
	onChange: (asset: Asset) => void;
}

const PriceLevelInput: React.FC<PriceLevelInputProps> = ({ asset, priceLevelBeingEdited, onChange }) => {
	const [priceLevel, setPriceLevel] = useState<PriceLevel | TransientPriceLevel>(priceLevelBeingEdited || getNewPriceLevel(asset));
	const [remainingAsset, setRemainingAsset] = useState<number>(calculateRemainingAsset(asset));

	useEffect(() => { setPriceLevel(getNewPriceLevel(asset)) }, [asset]);
	useEffect(() => {
		if (priceLevelBeingEdited) {
			setPriceLevel(priceLevelBeingEdited)
		}}, [priceLevelBeingEdited]
	);

	useDeepCompareEffect(() => {
		const additionalRemaining = priceLevelBeingEdited ? priceLevelBeingEdited.Quantity : 0;
		const remaining = calculateRemainingAsset(asset) + additionalRemaining;
		setRemainingAsset(remaining)
	}, [asset.PriceLevels, priceLevelBeingEdited, asset.Quantity]);

	function addPriceLevel() {
		onChange({...asset, PriceLevels: [...asset.PriceLevels, priceLevel as PriceLevel] });
	}

	function editPriceLevel() {
		const localLevel = priceLevel as PriceLevel;
		let updatedLevels = asset.PriceLevels.map(level => { return level.Id === localLevel.Id ? localLevel : level });
		// Since any price level can be edited and potentially allocate all the remaining asset
		// we need to filter out any subsequent price levels that not longer have revenue.
		// This is only necessary when the asset is allocated by percentage.
		if (asset.Method === "Percentage") {
			updatedLevels = filterPriceLevelsWithoutRevenue(asset.Quantity, updatedLevels);
		}
		onChange({...asset, PriceLevels: updatedLevels });
	}

	function handlePriceLevelChange(property: keyof typeof priceLevel) {
		return (e: React.ChangeEvent<HTMLInputElement>) =>
			setPriceLevel({ ...priceLevel, [property]: Number(e.target.value) });
	}

	return (
		<div className="price-level-container">
			<div className="heading-container">
				<div className="title-container">
					<h4>Price Levels</h4>
					<div className="info-container">
						<InfoTooltip tooltipText={"infoText"} />
					</div>
				</div>
				<button
					className={"unicode-button"}
					title={`${priceLevelBeingEdited ? "Update" : "Add"} Price Level`}
					disabled={!priceLevelBeingEdited && (!remainingAsset || !priceLevel.Price || !priceLevel.Quantity)}
					onClick={priceLevelBeingEdited ? editPriceLevel : addPriceLevel}>{priceLevelBeingEdited ? "💾" : "➕"}
				</button>
			</div>

			<div className="form-group">
				<label htmlFor="Price">Selling Price</label>
				<NumberInput
					id="Price"
					name="Price"
					value={priceLevel.Price}
					onChange={handlePriceLevelChange("Price")}
					enforceMinMax
					required
					disabled={remainingAsset === 0 && !priceLevelBeingEdited}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="Quantity">{ asset.Method }</label>
				<NumberInput
					id="Quantity"
					name="Quantity"
					value={priceLevel.Quantity}
					min={0}
					required
					disabled={remainingAsset === 0 && !priceLevelBeingEdited}
					enforceMinMax
					onChange={handlePriceLevelChange("Quantity")}
					{...(asset.Method === "Percentage" ? { max: 1 } : { max: remainingAsset })}
				/>
				{asset.Method === "Percentage" &&
					<div className="slider">
						<input
							id="slider"
							type="range"
							min="0"
							max="1"
							step="0.01"
							value={priceLevel.Quantity === "" ? 0 : priceLevel.Quantity}
							onChange={handlePriceLevelChange("Quantity")}
						/>
					</div>
				}
			</div>
		</div >
	);

};

export default PriceLevelInput;
