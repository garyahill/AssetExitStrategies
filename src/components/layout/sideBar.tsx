import * as React from "react";
import "./sideBar.less";

const SideBar = () => {
	return (
		<aside className={"sidebar"}>
			<h2>My Assets</h2>
			<p>Select one of your previously created scenarios or click "Add Scenario" to build a new exit strategy.</p>
			<button className={"button-primary"}>Add Scenario</button>
		</aside>
	);
};

export default SideBar;