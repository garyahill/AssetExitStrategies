import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import NewAccount from "./pages/login/newAccount";
import Main from "./pages/main/main";

function App() {

	return (
		<Router>
		  <Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="login" element={<Login />} />
					<Route path="newaccount" element={<NewAccount />} />
					<Route path="main" element={<Main />} />
				</Route>
		  </Routes>
		</Router>
	  );
}

export default App;