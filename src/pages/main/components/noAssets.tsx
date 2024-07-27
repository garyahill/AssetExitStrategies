import * as React from "react";

// TODO: look at how this component displays to see if I need more to be less boring looking
const NoAssets: React.FC = () => {
	return (
		<p>
			You currently have no scenarios to display.
			Click <i>Add Scenario</i> to create a new exit strategy.
		</p>
	);
};

export default NoAssets;
