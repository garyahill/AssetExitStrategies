import React from "react";
import App from "./App"
import "./index.less";
import ReactDOM from "react-dom/client";

const el = document.getElementById("root")!;
const root = ReactDOM.createRoot(el);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
