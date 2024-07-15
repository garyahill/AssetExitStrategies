import React from "react";
import App from "./App"
import ReactDOM from "react-dom/client";
import { AppProvider } from './AppContext';

const el = document.getElementById("root")!;
const root = ReactDOM.createRoot(el);
root.render(
	<React.StrictMode>
		<AppProvider>
			<App />
		</AppProvider>
	</React.StrictMode>
);
