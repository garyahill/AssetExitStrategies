import React from "react";
import { Asset, PriceLevel, ScenarioError } from "../../../models";
import { FormatAsDollars, FormatAsPercentage, RoundToPlaces} from "../../../utilities/numbers";
import "./scenarioTable.less";

interface TableContainerProps {
	asset: Asset;
	onEdit?: (priceLevelId: number) => void;
	onDelete?: (priceLevelId: number) => void;
	onError?: (errors: ScenarioError[]) => void; // TODO: Implement error handling
}

const ScenarioTable: React.FC<TableContainerProps> = ({asset, onEdit, onDelete}) => {
	const { Method, PriceLevels } = asset;
	const showButtons = onEdit && onDelete;

	const getRows = (levels: PriceLevel[]) => {

		const sortedLevels = levels.sort((a, b) => a.Price - b.Price);

		let amountSold = 0;
		let revenue = 0;
		let cumulativeSold = 0;
		let remainingAsset = asset.Quantity;
		let cumulativeRevenue = 0;
		let percentSold = 0;


		return sortedLevels.map((level, index) => {

			if (Method === "Percentage") {
				percentSold = level.Quantity;
				amountSold = remainingAsset * percentSold;
				revenue = level.Price * amountSold;
				cumulativeSold += amountSold;
				remainingAsset -= amountSold;
				cumulativeRevenue += revenue;
			} else {
				amountSold = level.Quantity;
				revenue = level.Price * level.Quantity;
				cumulativeSold += level.Quantity;
				percentSold = amountSold / remainingAsset;
				remainingAsset -= level.Quantity;
				cumulativeRevenue += revenue;
			}

			return (
				<tr key={`row_${index}`} className={`${remainingAsset < 0 ? "error-row" : undefined}`}>
					<td>{FormatAsDollars(level.Price)}</td>
					<td>{FormatAsPercentage(percentSold, 2)}</td>
					<td>{RoundToPlaces(amountSold)}</td>
					<td>{RoundToPlaces(cumulativeSold)}</td>
					<td>{RoundToPlaces(remainingAsset)}</td>
					<td>{FormatAsDollars(revenue)}</td>
					<td>{FormatAsDollars(cumulativeRevenue)}</td>
					{showButtons &&
					<td className="action-column">
						<div className="button-container">
							<button className={"unicode-button"} title="Edit" onClick={() => onEdit(level.Id)}>📝</button>
							<button className={"unicode-button"} title="Remove" onClick={() => onDelete(level.Id)}>🗑️</button>
						</div>
					</td>
					}
				</tr>
			);
		});
	};

	return (
		<div className="table-container">
			<table className="scenario-table">
				<thead>
					<tr>
						<th>Price Level</th>
						<th>Percent Sold</th>
						<th>Units Sold</th>
						<th>Cumulative Sold</th>
						<th>Remaining Asset</th>
						<th>Revenue</th>
						<th>Cumulative Revenue</th>
						{showButtons &&
							<th className="action-column">Actions</th>
						}
					</tr>
				</thead>
				<tbody>
					{ getRows(PriceLevels) }
				</tbody>
			</table>
		</div>
	);
};



export default ScenarioTable;