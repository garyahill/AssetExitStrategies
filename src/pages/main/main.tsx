import React from "react";
import { useAppContext } from "../../hooks/useAppContext";
import "./main.less";


const Main = () => {
	const { profile } = useAppContext();

	return (
		<div className="content-container">
			{/* TODO: Need to figure out my scheme for redirect to login if no context
                do we actually need to have profile be nullable?
            */}
			<h2>{`Welcome ${profile!.Name}`}</h2>
		</div>
	);
};

export default Main;