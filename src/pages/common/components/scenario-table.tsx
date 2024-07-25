import React from "react";
import "./scenario-table.less";
import { Asset, PriceLevel } from "../../../models";

interface TableContainerProps {
	asset: Asset;
	onEdit: (priceLevelId: number) => void;
	onDelete: (priceLevelId: number) => void;
}

const ScenarioTable: React.FC<TableContainerProps> = ({asset, onEdit, onDelete}) => {
	const { Method, PriceLevels } = asset;

	const getRows = (levels: PriceLevel[]) => {

		const sortedLevels = levels.sort((a, b) => a.Price - b.Price);
		let revenue = 0;
		let cumulativeSold = 0;
		let remainingAsset= asset.Quantity;
		let cumulativeRevenue = 0;

		return sortedLevels.map((level, index) => {

			revenue = level.Price * level.Quantity;
			cumulativeSold += level.Quantity;
			remainingAsset -= level.Quantity;
			cumulativeRevenue += revenue;

			return (
				<tr key={`row_${index}`}>
					<td>{level.Price}</td>
					<td>{level.Quantity}</td>
					<td>{cumulativeSold}</td>
					<td>{remainingAsset}</td>
					<td>{revenue}</td>
					<td>{cumulativeRevenue}</td>
					<td>
						<div className="button-container">
							<button className={"button-primary"} onClick={() => onEdit(level.Id)}>Edit</button>
							<button className={"button-secondary"} onClick={() => onDelete(level.Id)}>Delete</button>
						</div>
					</td>
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
						<th>Amount Sold</th>
						<th>Cumulative Sold</th>
						<th>Remaining Asset</th>
						<th>Revenue</th>
						<th>Cumulative Revenue</th>
						<th>Actions</th>
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