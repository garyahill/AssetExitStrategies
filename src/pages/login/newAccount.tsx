import React, {useEffect} from "react";
import useUserData from "../../hooks/useUserData";
import useNavigation from "../../hooks/useNavigation";
import ProfileInput from "./components/profileInput";
import useAuthentication from "../../hooks/useAuthentication";
import "./newAccount.less";

const NewAccount = () => {
	const { profile, updateProfile, saveNewProfile } = useUserData();
	const { isAuthenticated } = useAuthentication();
	const { navigateToMain } = useNavigation();

	useEffect(() => {
		if (isAuthenticated) {
			navigateToMain();
		}
	}, [isAuthenticated]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		saveNewProfile(profile);
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