import React, { CSSProperties } from "react";
import { ScenarioError } from "../../models";
import "./errorPanel.less";

interface ErrorPanelProps {
	title?: string;
	errors: ScenarioError[];
	customStyle?: CSSProperties ;
}

const ErrorPanel: React.FC<ErrorPanelProps> = ({ errors, title = "Errors", customStyle }) => {
	return (
		<div className={"error-container"} style={customStyle}>
			<h4>{title}</h4>
			<div>
				<ul>
					{errors.map((error, index) => (
						<li key={index}>{error.Message}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ErrorPanel;