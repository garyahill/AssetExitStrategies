import React from "react";
import { Asset } from "../../../models";
import { FormatAsDollars, RoundToPlaces } from "../../../utilities/numbers";
import { calculateRemainingAsset, projectedRevenue } from "../../../utilities/scenario";
import "./summaryBar.less";

interface SummaryBarProps {
	asset: Asset;
}

const SummaryBar: React.FC<SummaryBarProps> = ({ asset }) => {
	return (
		<div className="summary-container">
			<div className="summary-left">{`Asset Quantity: ${ RoundToPlaces(asset.Quantity) }`}</div>
			<div className="summary-middle">{`Remaining Quantity: ${ RoundToPlaces(calculateRemainingAsset(asset)) }`}</div>
			<div className="summary-right">{`Projected Revenue: ${ FormatAsDollars(projectedRevenue(asset)) }`}</div>
		</div>
	);
};

export default SummaryBar;