import React, {useState} from "react";
import { useLocation, Outlet } from "react-router-dom";
import Header from "./header";
import SideBar from "./sideBar";
import Footer from "./footer";
import { ModalProperties } from "../../models";
import FAQModal from "./faqModal";
import "../../theme/global.less";
import "./layout.less";

const noSideBar = ["/", "/login", "/newaccount", "/scenario", "/display"];

const faqModalProperties: ModalProperties = {
	isOpen: false,
	headerText: "Asset Exit Strategies FAQs",
	primaryButtonText: "Close",
}

function Layout() {
	const [modalProperties, setModalProperties] = useState<ModalProperties>({
		...faqModalProperties,
		onAccept: () => setModalProperties({...modalProperties, isOpen: false}),
	});

	const showSideBar = () => {
		const location = useLocation();
		return !noSideBar.includes(location.pathname);
	};

	return (
		<>
			<div className="app-container">
				<Header onFaqClick={() => setModalProperties({...modalProperties, isOpen: true})}/>
				<div className="body">
					{showSideBar() && <SideBar /> }
					<main className="page-content">
						<Outlet />
					</main>
				</div>
			</div>
			<Footer />
			<FAQModal modalProperties={modalProperties} />
		</>
	);
}

export default Layout;