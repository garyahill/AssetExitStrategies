export interface ModalProperties {
	isOpen: boolean;
	headerText?: string;
	bodyText?: string;
	primaryButtonText?: string;
	onCancel?: () => void;
	onAccept?: () => void;
}