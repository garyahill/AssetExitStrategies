import * as React from "react";
import useAppState from "../../hooks/useAppState";
import useNavigation from "../../hooks/useNavigation";
import { Asset } from "../../models";
import "./display.less";
import ScenarioTable from "../common/components/scenarioTable";

const Display: React.FC = () => {
	const { appState, setAppState } = useAppState();
	const { navigateToMain } = useNavigation();
	const { assetBeingDisplayed } = appState;

	const asset = assetBeingDisplayed as Asset;

	const cancel = () => {
		setAppState({ ...appState, assetBeingEdited: undefined });
		navigateToMain();
	};

	return (
		<div className={"asset-display-container"}>
			<div className="heading-container">
				<h2>{asset.AssetName}</h2>
				<div>
					<button className={"unicode-button"} title="Cancel" onClick={cancel}>❌</button>
				</div>
			</div>
			<div className="content-container">
				<div className="table-container">
					<ScenarioTable asset={asset} />
				</div>
				<div className="chart-container">
					<div>chart coming soon...</div>
				</div>
			</div>
		</div>
	);
};

export default Display;