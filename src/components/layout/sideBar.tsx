import * as React from "react";
import useNavigation from "../../hooks/useNavigation";
import useAppState from "../../hooks/useAppState";
import "./sideBar.less";

const SideBar = () => {
	const { appState, setAppState } = useAppState();
	const {navigateToAddScenario} = useNavigation();
	const { addingAsset } = appState;

	const addScenario = () => {
		setAppState({ ...appState, addingAsset: true });
		navigateToAddScenario();
	};

	return (
		<aside className={"sidebar"}>
			<h2>My Assets</h2>
			<p>Select one of your previously created scenarios or click "Add Scenario" to build a new exit strategy.</p>
			<button className={"button-primary"} onClick={addScenario} disabled={addingAsset}>Add Scenario</button>
		</aside>
	);
};

export default SideBar;