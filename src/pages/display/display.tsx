import * as React from "react";
import useAppState from "../../hooks/useAppState";
import useNavigation from "../../hooks/useNavigation";
import { Asset } from "../../models";
import ScenarioTable from "../common/components/scenarioTable";
import { getTableData } from "../../utilities/scenario";
import BarChart from "./components/barChart";
import { RoundToPlaces } from "../../utilities/numbers";
import "./display.less";

const Display: React.FC = () => {
	const { appState, setAppState } = useAppState();
	const { navigateToMain } = useNavigation();
	const { assetBeingDisplayed } = appState;

	const asset = assetBeingDisplayed as Asset;
	const assetDisplayData = getTableData(asset);

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
					<ScenarioTable asset={asset} tableData={assetDisplayData}/>
				</div>
				<div className="chart-container">
					{/*  TODO: Add other charts */}
					<div>
						<BarChart
							chartLabel={"% Asset Sold at Each Price Level"}
							dataPoints={ assetDisplayData.map((data) => Number(RoundToPlaces(data.AmountSold / asset.Quantity * 100, 2)))}
							dataPointLabelData={assetDisplayData.map((data) => `Price $${data.Price}`)}
							tooltipTextSuffix="%"
						/>
					</div>
					<div>
						<BarChart
							chartLabel={"Remaining Assets by Price Level"}
							dataPoints={assetDisplayData.map((data) => Number(RoundToPlaces(data.RemainingAsset, 2)))}
							dataPointLabelData={assetDisplayData.map((data) => `Price $${data.Price}`)}
							tooltipTextPrefix="Units "
						/>
					</div>
					<div>
						<BarChart
							chartLabel={"Cumulative Revenue by Price Level"}
							dataPoints={assetDisplayData.map((data) => Number(RoundToPlaces(data.CumulativeRevenue, 2)))}
							dataPointLabelData={assetDisplayData.map((data) => `Price $${data.Price}`)}
							tooltipTextPrefix=" $"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Display;

