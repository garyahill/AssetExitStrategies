import * as React from "react";
import { BrowserRouter as Router, Route, useLocation, Outlet } from 'react-router-dom';
import Header from './header';
import SideBar from './sideBar';
import Footer from './footer';
import "../../theme/global.less";
import './layout.less';

const noSideBar = ["/", "/login", "/newaccount"];

function Layout() {

	// TODO: Should this logic be moved to a custom hook or put somewhere else?
	const showSideBar = () => {
		const location = useLocation();
		return !noSideBar.includes(location.pathname);
	};

	return (
		<div className="app-container">
			<Header />
			<div className="body">
				{showSideBar() && <SideBar /> }
				<main className="page-content">
					<Outlet />
				</main>
			</div>
			<Footer />
		</div>
	);
}

export default Layout;