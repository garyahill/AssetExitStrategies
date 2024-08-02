import React, { useState } from "react";
import { Asset, MethodType } from "../.././../models";
import CustomModal from "../../../components/controls/customModal";
import NumberInput from "../../../components/controls/numberInput";
import "./scenarioInput.less";

interface ScenarioInputProps {
	asset: Asset;
	onChange: (asset: Asset) => void;
}

const ScenarioInput: React.FC<ScenarioInputProps> = (props) => {
	const { asset, onChange } = props;
	const [modalIsOpen, setIsOpen] = useState(false);

	const modelText = `Changing your distribution type to Percentage will invalidate 
		previous set Price Levels. Would you like to continue?`;

	function handleChange(property: keyof typeof asset) {
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = property === "Quantity" ? Number(e.target.value) : e.target.value;
			onChange({ ...asset, [property]: value });
		};
	}

	function handleMethodTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		if (asset.PriceLevels.length) {
			setIsOpen(true);
		} else {
			onChange({ ...asset, Method: value as MethodType });
		}
	}

	const onModalConfirmation = (retVal: boolean) => {
		setIsOpen(false);
		if (retVal) {
			const flipVal = asset.Method === "Units" ? "Percentage" : "Units";
			onChange({ ...asset, Method: flipVal, PriceLevels: [] });
		}
	};

	function getInputElements() {
		return (
			<div className="asset-info-container">
				<div className="heading-container">
					<div className="title-container">
						<h4>Asset Details</h4>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="AssetName">Asset Name</label>
					<input
						type="text"
						id="AssetName"
						name="AssetName"
						value={asset.AssetName}
						onChange={handleChange("AssetName")}
						required
						autoComplete="off"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="Quantity">Quantity</label>
					<NumberInput
						id="Quantity"
						name="Quantity"
						value={asset.Quantity ? asset.Quantity : ""}
						onChange={handleChange("Quantity")}
						required
					/>
				</div>

				<div className="form-group">
					<label >Disposition</label>
					<div className="option-group">
						<label className="radio-label">
							<input
								type="radio"
								value="Units"
								checked={asset.Method === "Units"}
								onChange={handleMethodTypeChange}
							/>{"Units"}
						</label>
						<label className="radio-label">
							<input
								type="radio"
								value="Percentage"
								checked={asset.Method === "Percentage"}
								onChange={handleMethodTypeChange}
							/>{"Percentage"}
						</label>
					</div>
				</div>

				<CustomModal
					isOpen={modalIsOpen}
					onCancel={() => onModalConfirmation(false)}
					onAccept={() => onModalConfirmation(true)}
					primaryButtonText={"Continue"}
					height="230px"
					headerText={"Confirm Change"} >
					<p>{ modelText }</p>
				</CustomModal>
			</div >
		);
	}

	return getInputElements();
};

export default ScenarioInput;