import React from "react";
import ReactModal from "react-modal";
import "./customModal.less";

ReactModal.setAppElement("#root");

interface CustomModalProps {
	isOpen: boolean;
	headerText?: string;
	children?: React.ReactNode;
	width?: string;
	height?: string;
	top?: string;
	primaryButtonText?: string;
	onCloseOnOverlayClick?: () => void;
	onCancel?: () => void;
	onAccept?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ width = "50%", height = "50%", top = "30%", primaryButtonText = "Discard", ...props }) => {

	const customStyles = {
		overlay: {
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			zIndex: 1000,
		},
		content: {
			top,
			left: "50%",
			transform: "translate(-50%, -50%)",
			width,
			height,
			background: "white",
			padding: "20px",
			borderRadius: "10px",
			zIndex: 1001,
		},
	};

	return (
		<ReactModal
			isOpen={props.isOpen}
			onRequestClose={props.onCloseOnOverlayClick}
			style={customStyles}
			contentLabel="Custom Modal"
		>
			<div className="content-container">
				<div className="header-section">
					{props.headerText && <h2>{props.headerText}</h2>}
				</div>
				<div className="main-section">
					{props.children}
				</div>
				<div className="footer-section">
					{props.onCancel && <button onClick={props.onCancel} className="button-secondary">Cancel</button>}
					{props.onAccept && <button onClick={props.onAccept} className="button-primary">{primaryButtonText}</button>}
				</div>
			</div>
		</ReactModal>
	);
};

export default CustomModal;