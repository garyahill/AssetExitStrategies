import { Profile } from "../models";
import useAppContext from "./useAppContext";
import useAuthentication from "../hooks/useAuthentication";
import { getUserDataFromLocalStorage, saveUserDataToLocalStorage } from "../utilities/storage";
import { defaultProfile } from "../AppContext";

const useUserData = () => {
	const { assets, profile, setAssets, setProfile } = useAppContext();
	const { login } = useAuthentication();

	const updateProfile = (profile: Profile) => {
		setProfile(profile);
	};

	const saveNewProfile = (profile: Profile) => {
		const userData = { Profile: profile, Assets: [] };
		saveUserDataToLocalStorage(getStorageKey(profile), userData);
		login();
	};

	const loadExistingProfile = (profile: Profile) => {
		const userData = getUserDataFromLocalStorage(getStorageKey(profile));

		if (userData) {
			setProfile(userData.Profile);
			setAssets(userData.Assets);
			login();
		}
	};

	const saveAssets = () => {
		const userData = { Profile: profile, Assets: assets };
		saveUserDataToLocalStorage(getStorageKey(profile), userData);
	}

	const getStorageKey = (profile: Profile): string => {
		const { UserName, ProfileKey } = profile;
		return `${UserName}_${ProfileKey}`;
	}

	return {
		profile,
		assets,
		defaultProfile,
		setProfile,
		setAssets,
		updateProfile,
		saveNewProfile,
		saveAssets,
		loadExistingProfile,
	};
};

export default useUserData;
