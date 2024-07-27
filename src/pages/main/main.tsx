import React from "react";
import useUserData from "../../hooks/useUserData";
import useNavigation from "../../hooks/useNavigation";
import useAppState from "../../hooks/useAppState";
import NoAssets from "./components/noAssets";
import AssetCard from "./components/assetCard";
import InfoTooltip from "../../components/controls/infoTooltip";
import "./main.less";

const Main = () => {
	const { profile, assets } = useUserData();
	const { navigateToDisplay } = useNavigation();
	const { appState, setAppState } = useAppState();
	const noAssets = assets.length === 0;

	const infoText = `Select an asset to display your exit stategy or 
		drag and drop items to rearrange asset layout.`;

	const getAssetCards = () => {
		return assets.map((asset) => {
			const onClick = () => {
				setAppState({
					...appState,
					assetBeingDisplayed: asset,
					assetBeingEdited: undefined,
				});
				navigateToDisplay();
			};

			return <AssetCard key={`Key_${asset.Id}`} asset={asset} onCardClick={onClick} />;
		});
	};

	return (
		<div className="main-container">
			<h2>{`Welcome ${profile.Name}`}</h2>
			{noAssets ? <NoAssets /> :
				<>
					<div className="title-container">
						<h4>Your Assets</h4>
						<div className="info-container">
							<InfoTooltip tooltipText={infoText} />
						</div>
					</div>
					<div className="assets-container">
						{getAssetCards()}
					</div>
				</>}
		</div>
	);
};

export default Main;