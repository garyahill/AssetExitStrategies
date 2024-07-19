import React from "react";
import { useAppContext } from "../../hooks/useAppContext";
import "./main.less";


const Main = () => {
	const { profile: prof } = useAppContext();
	const profile = prof!;

	return (
		<div className="main-container">
			<h2>{`Welcome ${profile.Name}`}</h2>
		</div>
	);
};

export default Main;