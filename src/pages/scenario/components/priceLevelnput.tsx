import React, { useEffect, useState }  from "react";
import { Asset, PriceLevel } from "../.././../models";
import "./priceLevelInput.less";

interface PriceLevelInputProps {
	asset: Asset;
	priceLevelBeingEdited?: PriceLevel;
	onChange: (asset: Asset) => void;
}

const PriceLevelInput: React.FC<PriceLevelInputProps> = ({ asset, priceLevelBeingEdited, onChange }) => {
	const [priceLevel, setPriceLevel] = useState<PriceLevel>(priceLevelBeingEdited || getNewPriceLevel(asset));
	useEffect(() => { setPriceLevel(getNewPriceLevel(asset)) }, [asset]);
	useEffect(() => {
		if (priceLevelBeingEdited) {
			setPriceLevel(priceLevelBeingEdited)
		}}, [priceLevelBeingEdited]
	);

	const isEditing = !!priceLevelBeingEdited;

	function addPriceLevel() {
		if (validatePriceLevel()) {
			onChange({...asset, PriceLevels: [...asset.PriceLevels, priceLevel] });
		}
	}

	function editPriceLevel() {
		const updatedLevels = asset.PriceLevels.map(level => { return level.Id === priceLevel.Id ? priceLevel : level });
		onChange({...asset, PriceLevels: updatedLevels });
	}

	function handlePriceLevelChange(property: keyof typeof priceLevel) {
		return (e: React.ChangeEvent<HTMLInputElement>) =>
			setPriceLevel({ ...priceLevel, [property]: Number(e.target.value) });
	}

	function validatePriceLevel() {
		const total = asset.PriceLevels.reduce((acc, level) => acc + Number(level.Quantity), Number(priceLevel.Quantity));
		return total <= asset.Quantity;
	}

	return (
		<div className="price-level-container">
			<div className="form-group">
				<label htmlFor="Price">Selling Price</label>
				<input
					type="number"
					id="Price"
					name="Price"
					value={priceLevel.Price}
					onChange={handlePriceLevelChange("Price")}
					required
				/>
			</div>
			<div className="form-group">
				<label htmlFor="Quantity">Quantity</label>
				<input
					type="number"
					id="Quantity"
					name="Quantity"
					value={priceLevel.Quantity}
					onChange={handlePriceLevelChange("Quantity")}
					required
				/>
			</div>
			<button className={"button-primary"} onClick={isEditing ? editPriceLevel : addPriceLevel}>{`${isEditing ? "Update" : "Add"} Price Level`}</button>
		</div >
	);

};

const getNewPriceLevel = (asset: Asset) => {
	const levels = asset.PriceLevels;
	const maxVal = levels.length > 0 ? (Math.max(...levels.map(obj => obj.Id)) + 1) : 1;
	return { Id: maxVal, Price: 0, Quantity: 0 };
}

export default PriceLevelInput;