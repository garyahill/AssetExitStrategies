import React from "react";
import { ReactSortable } from "react-sortablejs";
import useUserData from "../../hooks/useUserData";
import useNavigation from "../../hooks/useNavigation";
import useAppState from "../../hooks/useAppState";
import NoAssets from "./components/noAssets";
import AssetCard from "./components/assetCard";
import InfoTooltip from "../../components/controls/infoTooltip";
import { Asset } from "../../models";
import "./main.less";

const Main = () => {
	const { profile, assets, updateAssets } = useUserData();
	const { navigateToDisplay } = useNavigation();
	const { appState, setAppState } = useAppState();
	const noAssets = assets.length === 0;

	const infoText = `Select an asset to display your exit strategy or 
    drag and drop items to rearrange asset layout.`;

	const handleItemClick = (asset: Asset) => {
		setAppState({
			...appState,
			assetBeingDisplayed: asset,
			assetBeingEdited: undefined,
		});
		navigateToDisplay();
	};

	const handleUpdateAssets = (newAssets: Asset[]) => {
		// Update SortOrder after drag-and-drop
		const updatedAssets = newAssets.map((asset, index) => ({
			...asset,
			SortOrder: index + 1,
		}));
		updateAssets(updatedAssets);
	};

	return (
		<div className="main-container">
			<h2>{`Welcome ${profile.Name}`}</h2>
			{noAssets ? (
				<NoAssets />
			) : (
				<>
					<div className="title-container">
						<h4>Your Assets</h4>
						<div className="info-container">
							<InfoTooltip tooltipText={infoText} />
						</div>
					</div>
					<ReactSortable list={assets} setList={handleUpdateAssets} className="assets-container">
						{assets.map((asset) => (
							<div key={asset.id}>
								<AssetCard asset={asset} onCardClick={() => handleItemClick(asset)} />
							</div>
						))}
					</ReactSortable>
				</>
			)}
		</div>
	);
};

export default Main;
