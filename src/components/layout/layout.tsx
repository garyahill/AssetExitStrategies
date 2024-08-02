import * as React from "react";
import { useLocation, Outlet } from "react-router-dom";
import Header from "./header";
import SideBar from "./sideBar";
import Footer from "./footer";
import "../../theme/global.less";
import "./layout.less";

const noSideBar = ["/", "/login", "/newaccount", "/scenario" ];

function Layout() {
	const showSideBar = () => {
		const location = useLocation();
		return !noSideBar.includes(location.pathname);
	};

	return (
		<>
			<div className="app-container">
				<Header />
				<div className="body">
					{showSideBar() && <SideBar /> }
					<main className="page-content">
						<Outlet />
					</main>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default Layout;