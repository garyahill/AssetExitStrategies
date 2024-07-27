import React, { useState } from "react";
import useNavigation from "../../hooks/useNavigation";
import useUserData from "../../hooks/useUserData";
import useAppState from "../../hooks/useAppState";
import ScenarioInput from "./components/scenarioInput";
import PriceLevelInput from "./components/priceLevelnput";
import ScenarioTable from "../common/components/scenarioTable";
import { Asset, PriceLevel } from "../../models";
import "./scenario.less";

// TODO: Do I want to refactor this current state thing?
interface Progress {
	CurrentStep: number;
}

export interface ScenarioError {
	isError: boolean;
	Message: string | undefined;
}

const Scenario = () => {
	const { assets, addOrUpdateScenario } = useUserData();
	const { appState, setAppState } = useAppState();
	const { navigateToMain } = useNavigation();
	const [scenarioError, setScenarioError] = useState<ScenarioError>({isError: false, Message: undefined});

	const [asset, setAsset] = useState<Asset>(appState.assetBeingEdited || {
		Id: getNewAssetId(assets), // TODO: This should be done in the hook
		AssetName: "",
		Method: "Percentage",
		Quantity: 0,
		PriceLevels: [],
	});

	const [progress, setProgress] = useState<Progress>({ CurrentStep: 1 });
	const [priceLevelBeingEdited, setPriceLevelBeingEdited] = useState<PriceLevel | undefined>(undefined);

	const cancel = () => {
		setAppState({ ...appState, editingScenario: false });
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

	const saveScenario = () => {
		addOrUpdateScenario(asset);
		navigateToMain();
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


					{progress.CurrentStep === 1 &&
						<button className={"button-primary"} onClick={() => next(1)}>Next</button>
					}
					{progress.CurrentStep === 2 &&
						<>
							<button className={"button-primary"} onClick={() => next(-1)}>Previous</button>
							<button className={"button-primary"} onClick={saveScenario}>Save</button>
						</>
					}


				</div>
			</div>

			<div className="middle-container">
				{asset.PriceLevels.length > 0 &&
                    <>
                    	<h2>{"Scenario Outcome"}</h2>
                    	<ScenarioTable
                    		asset={asset}
                    		onError={(error: ScenarioError) => setScenarioError(error)}
                    		onEdit={editPriceLevel}
                    		onDelete={deletePriceLevel}
                    	/>
                    </>
				}
			</div>

			<div className="right-container">
				<button className={"unicode-button"} title="Cancel" onClick={cancel}>❌</button>
			</div>

		</div>
	);
};

const getNewAssetId = (assets: Asset[]) => {
	const maxVal = assets.length > 0 ? (Math.max(...assets.map(obj => obj.Id)) + 1) : 1;
	return maxVal;
}

export default Scenario;