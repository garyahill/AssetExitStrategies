import * as React from "react";
import "./welcome.less";

const Welcome: React.FC = () => {
	return (
		<div className="welcome-container">
			<h2>Welcome to Asset Exit Strategies</h2>
			<p>
				Asset Exit Strategies is an application to help you plan profit taking
				strategies for comodities and securities. It provides you with the tools
				to model the sale of these assets across multiple price levels with
				variable weighting and visualize the results of your strategy. This
				application can provide you with insight into potential outcomes to help
				you maximize your returns and minimize risk.
			</p>
		</div>
	);
};

export default Welcome;