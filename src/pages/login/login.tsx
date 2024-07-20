import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import { useAuth } from "../../AuthContext";
import ProfileInput from "./components/profileInput";
import ErrorMessage from "../../components/controls/errorMessage";
import "./login.less";

const Login = () => {
	const { profile, updateProfile, setProfile, loadExistingProfile } = useProfile();
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();
	const [showError, setShowError] = useState<boolean>(false);
	const [loginAttempted, setLoginAttempted] = useState<boolean>(false);

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/main");
		} else if (loginAttempted) {
			setProfile({ ...profile, UserName: "", ProfileKey: "" });
			setShowError(true);
		}
	}, [isAuthenticated]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		loadExistingProfile();
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