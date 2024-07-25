import React, { useState } from "react";
import useNavigation from "../../hooks/useNavigation";
import useAppContext from "../../hooks/useAppContext";
import useProfile from "../../hooks/useProfile";
import { Asset, PriceLevel } from "../../models";
import ScenarioInput from "./components/scenarioInput";
import PriceLevelInput from "./components/priceLevelnput";
import ScenarioTable from "../common/components/scenario-table";
import "./addScenario.less";

// TODO: Do I want to refactor this current state thing?
interface Progress {
	CurrentStep: number;
}

const AddScenario = () => {
	const { appState, setAppState, assets, setAssets } = useAppContext();
	const { navigateToMain } = useNavigation();
	const { saveAssets} = useProfile();

	const [asset, setAsset] = useState<Asset>({
		Id: getNewAssetId(assets),
		AssetName: "",
		Method: "Percentage",
		Quantity: 0,
		PriceLevels: [],
	});

	const [progress, setProgress] = useState<Progress>({ CurrentStep: 1 });
	const [priceLevelBeingEdited, setPriceLevelBeingEdited] = useState<PriceLevel | undefined>(undefined);

	const cancel = () => {
		setAppState({ ...appState, addingAsset: false });
		navigateToMain();
	};

	const deletePriceLevel = (priceLevelId: number) => {
		const updatedLevels = asset.PriceLevels.filter(level => level.Id !== priceLevelId);
		setAsset({...asset, PriceLevels: updatedLevels });
	}

	const editPriceLevel = (priceLevelId: number) => {
		const priceLevel = asset.PriceLevels.find(level => level.Id === priceLevelId);
		setPriceLevelBeingEdited(priceLevel);
	}

	const updatePriceLevel = (asset: Asset) => {
		setAsset(asset);
		setPriceLevelBeingEdited(undefined);
	}

	const addOrUpdateScenario = () => {
		let updatedAssets = [...assets];
		const index = assets.findIndex(currentAsset => currentAsset.Id === asset.Id);
		if (index === -1) {
			updatedAssets = [...updatedAssets,  asset];
		} else {
			updatedAssets[index] = asset;
		}
		setAssets(updatedAssets);
		saveAssets();
	}

	const next = (value: number) => setProgress({ ...progress, CurrentStep: progress.CurrentStep + value });

	return (
		<div className="scenario-container">
			<div className="left-container">
				<h2>{"Add New Scenario"}</h2>

				<ScenarioInput
					asset={asset}
					isReadOnly={progress.CurrentStep !== 1}
					onChange={setAsset}
				/>

				{progress.CurrentStep === 2 &&
                <PriceLevelInput
                	asset={asset}
                	priceLevelBeingEdited={priceLevelBeingEdited}
                	onChange={updatePriceLevel}
                />
				}

				<div className="button-container">
					<button className={"button-secondary"} onClick={cancel}>Cancel</button>
					<button className={"button-primary"} onClick={() => next(-1)} disabled={ progress.CurrentStep === 1 }>Previous</button>
					<button className={"button-primary"} onClick={() => next(1)} disabled={progress.CurrentStep === 2}>Next</button>
					<button className={"button-primary"} onClick={addOrUpdateScenario} disabled={ progress.CurrentStep === 1 }>Save</button>
				</div>
			</div>
			<div className="right-container">
				{asset.PriceLevels.length > 0 &&
                    <>
                    	<h2>{"Scenario Outcome"}</h2>
                    	<ScenarioTable
                    		asset={asset}
                    		onEdit={editPriceLevel}
                    		onDelete={deletePriceLevel}
                    	/>
                    </>
				}
			</div>
		</div>
	);
};

const getNewAssetId = (assets: Asset[]) => {
	const maxVal = assets.length > 0 ? (Math.max(...assets.map(obj => obj.Id)) + 1) : 1;
	return maxVal;
}



export default AddScenario;