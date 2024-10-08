import React, { useEffect, useState } from "react";
import useNavigation from "../../hooks/useNavigation";
import useUserData from "../../hooks/useUserData";
import useAppState from "../../hooks/useAppState";
import ScenarioInput from "./components/scenarioInput";
import PriceLevelInput from "./components/priceLevelnput";
import ScenarioTable from "../common/components/scenarioTable";
import { Asset, ModalProperties, PriceLevel, ScenarioError } from "../../models";
import CustomModal from "../../components/controls/customModal";
import isEqual from "lodash/isEqual";
import { getDefaultAsset, getTableData } from "../../utilities/scenario";
import SummaryBar from "./components/summaryBar";
import ErrorPanel from "../../components/controls/errorPanel";
import "./scenario.less";

const Scenario: React.FC = () => {
	const { assets, addOrUpdateScenario, removeScenario } = useUserData();
	const { appState, setAppState } = useAppState();
	const { navigateToMain } = useNavigation();
	const [modalProperties, setModalProperties] = useState<ModalProperties>({ isOpen: false });

	const startingAssetValue = appState.assetBeingEdited || getDefaultAsset(assets);
	const [originalAsset] = useState<Asset>(startingAssetValue);
	const [asset, setAsset] = useState<Asset>(startingAssetValue);

	const [priceLevelBeingEdited, setPriceLevelBeingEdited] = useState<PriceLevel | undefined>(undefined);
	const [scenarioErrors, setScenarioErrors] = useState<ScenarioError[]>([]);
	const [hasTableError, setHasTableError] = useState<boolean>(false);

	useEffect(() => {
		setScenarioErrors([]);
		asset.PriceLevels.length === 0 && setHasTableError(false);
	}, [asset.AssetName, asset.Quantity, asset.PriceLevels.length]);

	const cancel = () => {
		if (!isEqual(originalAsset, asset)) {

			const onModalConfirmation = (retVal: boolean) => {
				setModalProperties({ ...modalProperties, isOpen: false });
				if (retVal) {
					setAppState({ ...appState, editingScenario: false });
					navigateToMain();
				}
			};
			setModalProperties({
				isOpen: true,
				headerText: "Unsaved Changes",
				bodyText: `You've made changes that haven't been saved yet. 
					Are you sure you want to proceed and discard your changes?`,
				onCancel: () => onModalConfirmation(false),
				onAccept: () => onModalConfirmation(true),
			});
		} else {
			setAppState({ ...appState, editingScenario: false });
			navigateToMain();
		}
	};

	const deleteScenario = () => {
		const onModalConfirmation = (retVal: boolean) => {
			setModalProperties({ ...modalProperties, isOpen: false });
			if (retVal) {
				setAppState({ ...appState, editingScenario: false });
				removeScenario(asset.id);
				navigateToMain();
			}
		};

		setModalProperties({
			isOpen: true,
			headerText: "Delete Scenario",
			primaryButtonText: "Confirm",
			bodyText: `This action will permanently delete your ${asset.AssetName ? asset.AssetName : ""}
				exit strategy. Are you sure you want to continue?`,
			onCancel: () => onModalConfirmation(false),
			onAccept: () => onModalConfirmation(true),
		});
	};

	const deletePriceLevel = (priceLevelId: number) => {
		const updatedLevels = asset.PriceLevels.filter(level => level.Id !== priceLevelId);
		setAsset({ ...asset, PriceLevels: updatedLevels });
	}

	const editPriceLevel = (priceLevelId: number) => {
		const priceLevel = asset.PriceLevels.find(level => level.Id === priceLevelId);
		setPriceLevelBeingEdited(priceLevel);
	}

	const updatePriceLevel = (asset: Asset) => {
		setAsset(asset);
		setPriceLevelBeingEdited(undefined);
	}

	const validateRequiredFields = (): boolean => {
		const errors: ScenarioError[] = [];
		if (!asset.AssetName) { errors.push({ Field: "AssetName", Message: "Asset name is required." })}
		if (!asset.Quantity) { errors.push({ Field: "Quantity", Message: "An Asset Quantity is required." })}
		if (!asset.PriceLevels || asset.PriceLevels.length === 0) {
			errors.push({ Field: "PriceLevels", Message: "At least one Price Level is required." })}
		if (hasTableError) {errors.push({ Field: "Table", Message: "One or more Price Levels have an error."  });}
		setScenarioErrors(errors);
		return errors.length === 0;
	}

	const saveScenario = () => {
		if (!isEqual(originalAsset, asset)) {

			if (!validateRequiredFields()) {return; }
			addOrUpdateScenario(asset);
			navigateToMain();

		} else {
			cancel();
		}
	}

	const onAssetChange = (asset: Asset) => {
		setAsset(asset);
	}

	return (
		<>
			<div id="ScenarioContainer" className="scenario-container">
				<div className="flex-container">
					<div className="left-container">
						<h2>{`${appState.assetBeingEdited ? "Edit" : "Add New"} Scenario`}</h2>

						<ScenarioInput
							asset={asset}
							onChange={onAssetChange}
						/>

						<PriceLevelInput
							asset={asset}
							priceLevelBeingEdited={priceLevelBeingEdited}
							onChange={updatePriceLevel}
						/>

					</div>

					<div className="middle-container">
						<h2>{"Projected Outcome"}</h2>
						{!asset.PriceLevels.length &&
							<div className="no-rows-message">Add Asset Details and Price Levels to your scenario to view your exit strategy's projected outcome.</div>
						}
						{asset.PriceLevels.length > 0 &&
						<>
							<SummaryBar asset={asset} />

							<ScenarioTable
								asset={asset}
								tableData={getTableData(asset)}
								onError={(value) => setHasTableError(value)}
								onEdit={editPriceLevel}
								onDelete={deletePriceLevel}
							/>
						</>
						}
						{scenarioErrors.length > 0 &&
							<ErrorPanel
								title="Please fix the following errors:"
								customStyle={asset.PriceLevels.length === 0 ? { top: "67px" } : undefined }
								errors={scenarioErrors}
							/>
						}
					</div>

					<div className="right-container">
						<button className={"unicode-button"} title="Cancel" onClick={cancel}>❌</button>
					</div>

				</div>
				<div className={"scenario-button-container"}>
					{appState.assetBeingEdited &&
						<button
							className={"button-secondary"}
							onClick={deleteScenario}>Delete
						</button>
					}
					<button className={"button-primary"} onClick={saveScenario}>Save</button>
				</div>

				<CustomModal
					isOpen={modalProperties.isOpen}
					onCancel={modalProperties.onCancel}
					onAccept={modalProperties.onAccept}
					primaryButtonText={ modalProperties.primaryButtonText}
					height="230px"
					headerText={modalProperties.headerText}	>
					<p>{ modalProperties.bodyText}</p>
				</CustomModal>

			</div>
		</>
	);
};

export default Scenario;
