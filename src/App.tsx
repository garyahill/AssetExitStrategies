import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import Layout from "./components/layout/layout";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import NewAccount from "./pages/login/newAccount";
import Main from "./pages/main/main";
import Scenario from "./pages/scenario/scenario";
import Display from "./pages/display/display";

const App: React.FC = () => {

	// TODO: Remove this useEffect; it's just for testing purposes
	// useEffect(() => {
	// 	// eslint-disable-next-line no-console
	// 	console.log("NODE_ENV:", process.env.NODE_ENV);
	// }, []);

	const routerBaseName = process.env.NODE_ENV === "development" ? "/" : "/AssetExitStrategies";

	return (
		<AuthProvider>
			<Router basename={routerBaseName}>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="login" element={<Login />} />
						<Route path="newaccount" element={<NewAccount />} />
						<Route path="main" element={<PrivateRoute component={Main} />} />
						<Route path="scenario" element={<PrivateRoute component={Scenario} />} />
						<Route path="display" element={ <PrivateRoute component={Display} />} />
					</Route>
				</Routes>
			</Router>
		</AuthProvider>
	  );
}

export default App;