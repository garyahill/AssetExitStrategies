import * as React from "react";
import useAuthentication from "../../hooks/useAuthentication";
import useUserData from "../../hooks/useUserData";
import "./header.less";

interface HeaderProps {
	onFaqClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onFaqClick }) => {
	const { isAuthenticated } = useAuthentication();
	const { unloadProfile } = useUserData();

	return (
		<div className={"main-header-container"}>
			<div className={`flex-container ${!isAuthenticated && "unauthenticated"}`}>
	  		<div className={"header"}>
					<h1>Asset Exit Strategies</h1>
				</div>
				{isAuthenticated &&
					<div className={"header"}>
						<button className={"button-inverse"} onClick={onFaqClick}>FAQs</button>
						<button className={"button-primary"} onClick={unloadProfile}>Log off</button>
					</div>
				}
			</div>
		</div>
	);
};

export default Header;