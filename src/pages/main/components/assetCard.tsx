import React from "react";
import { Asset } from "../../../models";
import "./assetCard.less";

interface AssetCardProps {
	asset: Asset;
	onCardClick: () => void;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, onCardClick }): JSX.Element => {

	return (
		<div className="asset-card-container">
			<div className="asset-card" onClick={onCardClick}>
				<div>{asset.AssetName}</div>
				<div className="chart-container">📈</div>
				<div className="details">
					{`Quantity: ${asset.Quantity}`}
				</div>
				<div className="details">
					{`${asset.PriceLevels.length} Exits`}
				</div>
			</div>
		</div>
	);
};

export default AssetCard;