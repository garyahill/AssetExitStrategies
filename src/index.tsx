import React from "react";
import App from "./App"
import ReactDOM from "react-dom/client";
import { AppProvider } from "./AppContext";

const el = document.getElementById("root")!;
const root = ReactDOM.createRoot(el);
root.render(
	// TODO: Turn on React Strict Mode for deployment; Beautiful DnD (drag and drop)
	// is not compatible with Strict Mode
	<React.StrictMode>
		<AppProvider>
			<App />
		</AppProvider>
	</React.StrictMode>
);
