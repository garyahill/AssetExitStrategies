import { useState } from "react";
import { Profile } from "../models";
import {useAppContext} from "./useAppContext";
import { getUserDataFromLocalStorage, saveUserDataToLocalStorage } from "../utilities/storage";

const useProfile = () => {
	const appContext = useAppContext();
	const [profile, setProfile] = useState<Profile>({
		Name: "",
		UserName: "",
		ProfileKey: "",
	});

	const updateProfile = (name: string, value: string) => {
		setProfile(prevProfile => ({
			...prevProfile,
			[name]: value,
		}));
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
			return true;
		}
		return false;
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
