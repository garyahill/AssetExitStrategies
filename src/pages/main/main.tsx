import React from "react";
import useUserData from "../../hooks/useUserData";
import useNavigation from "../../hooks/useNavigation";
import useAppState from "../../hooks/useAppState";
import NoAssets from "./components/noAssets";
import AssetCard from "./components/assetCard";
import InfoTooltip from "../../components/controls/infoTooltip";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Asset } from "../../models";
import "./main.less";

const Main = () => {
	const { profile, assets, updateAssets } = useUserData();
	const { navigateToDisplay } = useNavigation();
	const { appState, setAppState } = useAppState();
	const noAssets = assets.length === 0;

	const infoText = `Select an asset to display your exit strategy or 
    drag and drop items to rearrange asset layout.`;

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const reorderedAssets = Array.from(assets);
		const [movedAsset] = reorderedAssets.splice(result.source.index, 1);
		reorderedAssets.splice(result.destination.index, 0, movedAsset);

		const updatedAssets = reorderedAssets.map((asset: Asset, index: number) => ({
			...asset,
			SortOrder: index, // Assign new index as the sort value
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
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="assets">
							{(provided) => (
								<div
									className="assets-container"
									{...provided.droppableProps}
									ref={provided.innerRef}
								>
									{assets.map((asset, index) => {
										const onClick = () => {
											setAppState({
												...appState,
												assetBeingDisplayed: asset,
												assetBeingEdited: undefined,
											});
											navigateToDisplay();
										};

										return (
											<Draggable
												key={asset.Id}
												draggableId={`Key_${asset.Id}`}
												index={index}
											>
												{(provided) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														<AssetCard asset={asset} onCardClick={onClick} />
													</div>
												)}
											</Draggable>
										);
									})}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</>
			)}
		</div>
	);
};

export default Main;