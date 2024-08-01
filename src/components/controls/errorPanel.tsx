import React from "react";
import { ScenarioError } from "../../models";
import "./ErrorPanel.less";

interface ErrorPanelProps {
	errors: ScenarioError[];
}

const ErrorPanel: React.FC<ErrorPanelProps> = ({ errors }) => {
	return (
		<div className="error-container">
			<h4>Errors</h4>
			<ul>
				{errors.map((error, index) => (
					<li key={index}>{error.Message}</li>
				))}
			</ul>
		</div>
	);
};

export default ErrorPanel;