import * as React from "react";
import "./theme/global.less";
import './App.less';
import {Header, Footer, SideBar, Content }from './components/layout';
import { Greeting, NoAssets } from "./components/controls";
import { getObjectFromLocalStorage } from "./utilities/storage";


function App() {

	const data = retrieveData("user");
	const initialElement = data ? <Greeting name={"Bob"} /> : <NoAssets />;

	return (
		<div className="app-container">
			<Header />
			<div className={"main-content"}>
				<SideBar />
				<Content>
					{initialElement}
				</Content>
			</div>
			<Footer />
		</div>
	);
}

// TODO: Retrieve correct data type
function retrieveData(key: string): object | null{
	return getObjectFromLocalStorage(key);
}

export default App;