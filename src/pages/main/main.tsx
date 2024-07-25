import React from "react";
import useUserData from "../../hooks/useUserData";
import NoAssets from "./components/noAssets";
import { Profile, Asset } from "../../models";
import "./main.less";

const Main = () => {
	const { profile, assets } = useUserData();
	const noAssets = assets.length === 0;

	return (
		<div className="main-container">
			<h2>{`Welcome ${profile.Name}`}</h2>
			{noAssets ? (
				<NoAssets />
			) : (
				// TODO: What should be rendered here?
				<div>
					<h3>Your Assets</h3>
				</div>
			)}
		</div>
	);
};

export default Main;