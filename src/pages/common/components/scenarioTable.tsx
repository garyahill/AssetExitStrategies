import React, { useEffect } from "react";
import { Asset, PriceLevel } from "../../../models";
import { FormatAsDollars, FormatAsPercentage, RoundToPlaces } from "../../../utilities/numbers";
import { getTableData, invalidTableData } from "../../../utilities/scenario";
import "./scenarioTable.less";


interface TableContainerProps {
	asset: Asset;
	onEdit?: (priceLevelId: number) => void;
	onDelete?: (priceLevelId: number) => void;
	onError?: (error: boolean) => void;
}

const ScenarioTable: React.FC<TableContainerProps> = ({asset, onEdit, onDelete, onError}) => {
	useEffect(() => {
		if (onError) {
			if (invalidTableData(asset)) {
				onError(true);
			} else {
				onError(false);
			}
		}
	}, [asset.Quantity, asset.PriceLevels]);

	const showButtons = onEdit && onDelete;

	const getRows = () => {
		const percentSoldDisplay = (hasError: boolean, percentSold: number) =>
			hasError ? <span className="error-text">error</span> :
				FormatAsPercentage(percentSold, 2);

		return getTableData(asset).map((rowData, index) => {
			const { Id, Price, PercentSold, AmountSold, CumulativeSold,
				RemainingAsset, Revenue, CumulativeRevenue, HasError } = rowData;
			return (
				<tr key={`row_${index}`} className={`${RemainingAsset < 0 ? "error-row" : undefined}`}>
					<td>{FormatAsDollars(Price)}</td>
					<td>{percentSoldDisplay(HasError, PercentSold)}</td>
					<td>{RoundToPlaces(AmountSold)}</td>
					<td>{RoundToPlaces(CumulativeSold)}</td>
					<td>{RoundToPlaces(RemainingAsset)}</td>
					<td>{FormatAsDollars(Revenue)}</td>
					<td>{FormatAsDollars(CumulativeRevenue)}</td>
					{showButtons &&
						<td className="action-column">
							<div className="button-container">
								<button className={"unicode-button"} title="Edit" onClick={() => onEdit(Id)}>📝</button>
								<button className={"unicode-button"} title="Remove" onClick={() => onDelete(Id)}>🗑️</button>
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
					{ getRows() }
				</tbody>
			</table>
		</div>
	);
};

export default ScenarioTable;