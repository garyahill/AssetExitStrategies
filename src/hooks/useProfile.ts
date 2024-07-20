import { useState } from "react";
import { Profile } from "../models";
import { useAppContext } from "./useAppContext";
import { useAuth } from "../AuthContext";
import { getUserDataFromLocalStorage, saveUserDataToLocalStorage } from "../utilities/storage";
import { defaultProfile } from "../AppContext";

const useProfile = () => {
	const appContext = useAppContext();
	const { login } = useAuth();
	const [profile, setProfile] = useState<Profile>(defaultProfile);

	const updateProfile = (profile: Profile) => {
		setProfile(profile);
	};

	const saveNewProfile = () => {
		const userData = { Profile: profile, Assets: [] };
	    saveUserDataToLocalStorage(getStorageKey(), userData);
	};

	const loadExistingProfile = () => {
		const userData = getUserDataFromLocalStorage(getStorageKey());

		if (userData) {
			appContext.setProfile(userData.Profile);
			appContext.setAssets(userData.Assets);
			login();
		}
	};

	const getStorageKey = (): string => {
		return `${profile.UserName}_${profile.ProfileKey}`;
	}

	return {
		profile,
		setProfile,
		updateProfile,
		saveNewProfile,
		loadExistingProfile,
	};
};

export default useProfile;
