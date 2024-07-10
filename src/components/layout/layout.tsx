import * as React from "react";
import { Outlet } from 'react-router-dom';
import "../../theme/global.less";
import './layout.less';
import Header from './header';
import SideBar from './sideBar';
import Footer from './footer';


function Layout() {

	return (
		<div className="app-container">
			<Header />
			<div className="body">
				<SideBar />
				<main className="page-content">
					<Outlet />
				</main>
			</div>
			<Footer />
		</div>
	);
}

export default Layout;