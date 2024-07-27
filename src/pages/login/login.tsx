import React, { useState, useEffect } from "react";
import useNavigation from "../../hooks/useNavigation";
import useUserData from "../../hooks/useUserData";
import useAuthentication from "../../hooks/useAuthentication";
import ProfileInput from "./components/profileInput";
import ErrorMessage from "../../components/controls/errorMessage";
import "./login.less";

const Login = () => {
	const { defaultProfile, profile, updateProfile, setProfile, loadExistingProfile} = useUserData();
	const { isAuthenticated } = useAuthentication();
	const [showError, setShowError] = useState<boolean>(false);
	const [loginAttempted, setLoginAttempted] = useState<boolean>(false);
	const { navigateToMain } = useNavigation();

	useEffect(() => {
		if (isAuthenticated) {
			navigateToMain();
		} else if (loginAttempted) {
			setProfile(defaultProfile);
			setShowError(true);
		}
	}, [isAuthenticated, loginAttempted]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		loadExistingProfile(profile);
		setLoginAttempted(true);
	};

	return (
		<div className="content-container">
			<h2>Account Login</h2>
			<ProfileInput
				profile={profile}
				onChange={updateProfile}
				onButtonClick={handleSubmit}
			/>

			<ErrorMessage
				message="Your profile not found. Please verify your Username and Profile Key."
				isVisible={showError}
				customStyle={{ marginBottom: "20px" }}
			/>
		</div>

	);
};

export default Login;