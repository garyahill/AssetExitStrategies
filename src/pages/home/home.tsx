import React, { useEffect } from "react";
import Welcome from "./components/welcome";
import { Link } from "react-router-dom";
import bull from "../../images/Bull.png";
import useAuthentication from "../../hooks/useAuthentication";
import useNavigation from "../../hooks/useNavigation";
import "./home.less";

const Home: React.FC = () => {
	const { isAuthenticated } = useAuthentication();
	const { navigateToMain } = useNavigation();

	useEffect(() => {
		if (isAuthenticated) {
			navigateToMain();
		}
	}, [isAuthenticated]);

	return (
		<div className="content-container">
			<Welcome />
			<div className={"actions"}>
				<Link to="/login">Load Profile</Link>
				<span>- or -</span>
				<Link to="/newaccount">Create New Account</Link>
			</div>
			<div className="image-container">
				<img src={bull} alt="Bull" />
			</div>
		</div>
	);
};

export default Home;