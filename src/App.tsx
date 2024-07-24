import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import Layout from "./components/layout/layout";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import NewAccount from "./pages/login/newAccount";
import Main from "./pages/main/main";
import AddScenario from "./pages/scenarios/addScenario";

const App: React.FC = () => {

	// TODO: Remove this useEffect; it's just for testing purposes
	useEffect(() => {
		// eslint-disable-next-line no-console
		console.log("NODE_ENV:", process.env.NODE_ENV);
	}, []);

	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="login" element={<Login />} />
						<Route path="newaccount" element={<NewAccount />} />
						<Route path="main" element={<PrivateRoute component={Main} />} />
						<Route path="addscenario" element={ <PrivateRoute component={AddScenario} />} />
					</Route>
				</Routes>
			</Router>
		</AuthProvider>
	  );
}

export default App;