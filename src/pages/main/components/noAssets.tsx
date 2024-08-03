import * as React from "react";
import bull from "../../../images/Bull.png";
import "./noAssets.less";

const NoAssets: React.FC = () => {
	return (
		<div className="no-assets-container">
			<p>
				You currently have no scenarios to display.
				Click <b>Add Asset</b> to create a new Asset Exit Strategy.
			</p>
			<div className="image-container">
				<img src={bull} alt="Bull" />
			</div>
		</div>
	);
};

export default NoAssets;
