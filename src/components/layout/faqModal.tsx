import React from "react";
import CustomModal from "../controls/customModal";
import { ModalProperties } from "../../models";
import FaqList from "../../pages/common/components/faqList";

interface FAQModalProps {
	modalProperties: ModalProperties;
}

const FAQModal: React.FC<FAQModalProps> = ({ modalProperties }) => {

	return (
		<CustomModal
			isOpen={modalProperties.isOpen}
			onAccept={modalProperties.onAccept}
			onCloseOnOverlayClick={modalProperties.onAccept}
			primaryButtonText={modalProperties.primaryButtonText}
			headerText={modalProperties!.headerText}
			height="500px"
			top="36%"
		>
			<FaqList />
		</CustomModal>
	);
};

export default FAQModal;