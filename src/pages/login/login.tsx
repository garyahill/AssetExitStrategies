import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import ProfileInput from "./components/profileInput";
import ErrorMessage from "../../components/controls/errorMessage";
import "./login.less";

const Login = () => {
	const { profile, updateProfile, setProfile, loadExistingProfile } = useProfile();
	const navigate = useNavigate();
	const [showError, setShowError] = useState<boolean | undefined>(undefined);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const value = loadExistingProfile();
		if (value) {
			navigate("/main");
		}
		setProfile({ ...profile, UserName: "", ProfileKey: "" });
		setShowError(true);
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