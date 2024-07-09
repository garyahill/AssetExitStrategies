import * as React from "react";
import "./theme/global.less";
import './App.less';
import Header from './components/layout/header';
import Sidebar from './components/layout/sideBar';
import Footer from './components/layout/footer';
import Content from './components/layout/content';

function App() {

	return (
		<div className="container">
			<Header />
			<div className={"body"}>
				<Sidebar />
				<Content>
					<h2>Welcome to Asset Exit Strategies</h2>
					<p>
						Asset Exit Strategies is an application to help you plan profit taking strategies for comodities and securities.  It provides you with the tools to model the sale of these assets across
						multiple price levels with variable weighting and visualize the results of your strategy.  This application can provide you with insight into potential outcomes to help you maximize your returns and minimize risk.
					</p>
				</Content>
			</div>
			<Footer />
		</div>
	);
}

export default App;