import * as React from "react";
import bull from "../../../images/Bull.png";
import "./noAssets.less";

interface NoAssetsProps {
	onLoadDemoData: () => void;
}

const NoAssets: React.FC<NoAssetsProps> = ({ onLoadDemoData }) => {
	return (
		<div className="no-assets-container">
			<p>
				You currently have no scenarios to display.
				Click <b>Add Asset</b> to create a new Asset Exit Strategy or click <button onClick={onLoadDemoData}>here</button> to load demo data.
			</p>
			<div className="image-container">
				<img src={bull} alt="Bull" />
			</div>
		</div>
	);
};

export default NoAssets;
