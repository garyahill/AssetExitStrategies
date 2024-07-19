import React from "react";
import useProfile from "../../hooks/useProfile";
import ProfileInput from "./components/profileInput";
import "./newAccount.less";

const NewAccount = () => {
	const { profile, updateProfile, saveNewProfile } = useProfile();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		saveNewProfile();
	};

	return (
		<div className="content-container">
			<h2>Create New Account</h2>
			<ProfileInput
				isCreate={true}
				profile={profile}
				buttonText="Save"
				onChange={updateProfile}
				onButtonClick={handleSubmit}
			/>
		</div>
	);
};

export default NewAccount;