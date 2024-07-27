import * as React from "react";
import useNavigation from "../../hooks/useNavigation";
import useAppState from "../../hooks/useAppState";
import useUserData from "../../hooks/useUserData";
import { Link } from "react-router-dom";
import { Asset } from "../../models";
import "./sideBar.less";

const SideBar = () => {
	const { appState, setAppState } = useAppState();
	const { navigateToScenario } = useNavigation();
	const { assets } = useUserData();
	const { editingScenario } = appState;

	const assetText = `Select one of your previously created scenarios or 
		click "Add Asset" to build a new exit strategy.`
	const noAssetText = `Select one of your previously created scenarios or click 
		"Add Asset" to build a new exit strategy.`;

	const addScenario = () => {
		setAppState({ ...appState, editingScenario: true, assetBeingEdited: undefined, assetBeingDisplayed: undefined });
		navigateToScenario();
	};

	const getAssetLink = (asset: Asset) => {
		const onClick = () => {
			setAppState({ ...appState, editingScenario: true, assetBeingEdited: asset, assetBeingDisplayed: undefined });
			navigateToScenario();
		}

		return (
			<li key={`Key_${asset.Id}`}>
				<Link onClick={onClick} to={"/scenario"}>{asset.AssetName}</Link>
			</li>
		);
	};

	return (
		<aside className={"sidebar"}>
			<h2>My Scenarios</h2>
			<p>{ assetText }</p>
			{assets.length > 0 &&
				<ul>
					{assets.map(asset => getAssetLink(asset))}
				</ul>
			}
			{assets.length === 0 &&
				<p>noAssetText</p>
			}

			<button
				className={"button-primary"}
				onClick={addScenario}
				disabled={editingScenario}>Add Asset
			</button>
		</aside>
	);
};

export default SideBar;