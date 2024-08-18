import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import Layout from "./components/layout/layout";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import NewAccount from "./pages/login/newAccount";
import LoadingSpinner from "./pages/common/components/loading";

// Lazy load the main, scenario, and display pages,
// which use chart.js and other resources not needed for the initial load
const Main = React.lazy(() => import("./pages/main/main"));
const Scenario = React.lazy(() => import("./pages/scenario/scenario"));
const Display = React.lazy(() => import("./pages/display/display"));

const App: React.FC = () => {

	// TODO: DEV CODE: Remove this useEffect; it's just for testing purposes
	// useEffect(() => {
	// 	// eslint-disable-next-line no-console
	// 	console.log("NODE_ENV:", process.env.NODE_ENV);
	// }, []);

	// Set the router base name based on the NODE_ENV environment variable
	const routerBaseName = process.env.NODE_ENV !== "development" ? "/AssetExitStrategies" : "/";

	return (
		<AuthProvider>
			<Router basename={routerBaseName}>
				<Suspense fallback={<LoadingSpinner />}>
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
				</Suspense>
			</Router>
		</AuthProvider>
	  );
}

export default App;