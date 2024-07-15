import React from "react";
import useProfile from "../../hooks/useProfile";
import ProfileInput from "./components/profileInput";
import "./login.less";

const Login = () => {
	const { profile, updateProfile, loadProfile } = useProfile();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		updateProfile(name, value);
	};

	return (
		<div className="content-container">
			<h2>Login to Account</h2>
			<ProfileInput
				profile={profile}
				onChange={handleChange}
				onButtonClick={loadProfile}
			/>
		</div>
	);
};

export default Login;