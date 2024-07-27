import { useNavigate } from "react-router-dom";

const useNavigation = () => {
	const navigate = useNavigate();

	const navigateToHome = () => navigate("/");
	const navigateToNewAccount = () => navigate("/newaccount");
	const navigateToLogin = () => navigate("/login");
	const navigateToMain = () => navigate("/main");
	const navigateToScenario = () => navigate("/scenario");
	const navigateToDisplay = () => navigate("/display");

	return {
		navigateToHome,
		navigateToNewAccount,
		navigateToLogin,
		navigateToMain,
		navigateToScenario,
		navigateToDisplay,
	};
};

export default useNavigation;