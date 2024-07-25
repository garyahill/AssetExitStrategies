import React from "react";
import { Asset } from "../.././../models";
import "./scenarioInput.less";

interface ScenarioInputProps {
	asset: Asset;
	isReadOnly?: boolean;
	onChange: (asset: Asset) => void;
}

const ScenarioInput: React.FC<ScenarioInputProps> = (props) => {
	const { asset, isReadOnly, onChange } = props;


	function handleChange(property: keyof typeof asset) {
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = property === "Quantity" ? Number(e.target.value) : e.target.value;
			onChange({ ...asset, [property]: value });
		};
	}

	function getInputElements() {
		return (
			<div className="asset-info-container">
				<div className="form-group">
					<label htmlFor="AssetName">Asset Name</label>
					<input
						type="text"
						id="AssetName"
						name="AssetName"
						value={asset.AssetName}
						onChange={handleChange("AssetName")}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="Quantity">Quantity</label>
					<input
						type="number"
						id="Quantity"
						name="Quantity"
						value={asset.Quantity}
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
								value="Percentage"
								checked={asset.Method === "Percentage"}
								onChange={handleChange("Method")}
							/>{"Percentage"}
						</label>
						<label className="radio-label">
							<input
								type="radio"
								value="Units"
								checked={asset.Method === "Units"}
								onChange={handleChange("Method")}
							/>{"Units"}
						</label>
					</div>
				</div>
			</div >
		);
	}

	function getDisplayElements() {
		return (
			<div className="display-info-container">
				<label>{`Asset Name: ${asset.AssetName}`}</label>
				<label>{`Disposition: ${asset.Method}`}</label>
				<label>{`Quantity: ${asset.Quantity}`}</label>
			</div>
		);
	}

	return isReadOnly ? getDisplayElements() : getInputElements();
};



export default ScenarioInput;