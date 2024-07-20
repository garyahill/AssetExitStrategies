import * as React from "react";
import "./errorMessage.less";

export interface ErrorMessageProps {
	message: string;
	isVisible: boolean;
	customStyle?: React.CSSProperties;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, isVisible, customStyle }) => {
	return (
		<div className={isVisible ? "message-container error" : "message-container"} style={customStyle}>
			{message}
		</div>
	);
};

export default ErrorMessage;