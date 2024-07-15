import React from "react";
import Welcome from "./components/welcome";
import "./home.less";
import { Link } from "react-router-dom";

// TODO: What props does this component take in if any?
interface HomeProps {
	children?: React.ReactNode;
}

const Home: React.FC<HomeProps> = (props) => {
	return (
		<div className="content-container">
			<Welcome />
			<div className={"actions"}>
				<Link to="/login">Load Profile</Link>
				<span>- or -</span>
				<Link to="/newaccount">Create New Account</Link>
			</div>
		</div>
	);
};

export default Home;