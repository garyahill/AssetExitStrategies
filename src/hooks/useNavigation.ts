import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
	const navigate = useNavigate();

	const navigateToHome = () => navigate("/");
	const navigateToNewAccount = () => navigate("/newaccount");
	const navigateToLogin = () => navigate("/login");
	const navigateToMain = () => navigate("/main");
	const navigateToAddScenario = () => navigate("/addscenario");

	return {
		navigateToHome,
		navigateToNewAccount,
		navigateToLogin,
		navigateToMain,
		navigateToAddScenario,
	};
};