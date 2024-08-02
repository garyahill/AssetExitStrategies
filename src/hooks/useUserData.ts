import { Asset, Profile } from "../models";
import useAppContext from "./useAppContext";
import useAuthentication from "../hooks/useAuthentication";
import { getUserDataFromLocalStorage, saveUserDataToLocalStorage } from "../utilities/storage";
import { defaultAppState, defaultProfile, defaultAssets } from "../AppContext";

const useUserData = () => {
	const { assets, profile, setAssets, setProfile, appState, setAppState } = useAppContext();
	const { login, logout } = useAuthentication();

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
			setAppState({ ...appState, editingScenario: false });
			login();
		}
	};

	const unloadProfile = () => {
		setProfile(defaultProfile);
		setAssets(defaultAssets);
		setAppState(defaultAppState);
		logout();
	};

	const addOrUpdateScenario = (asset: Asset) => {
		let updatedAssets = [...assets];
		const index = assets.findIndex(currentAsset => currentAsset.Id === asset.Id);
		if (index === -1) {
			updatedAssets = [...updatedAssets, asset];
		} else {
			updatedAssets[index] = asset;
		}
		setAssets(updatedAssets);
		saveUserDataToLocalStorage(getStorageKey(profile), { Profile: profile, Assets: updatedAssets });
		setAppState({ ...appState, editingScenario: false });
	};

	const removeScenario = (assetId: number) => {
		const updatedAssets = assets.filter(asset => asset.Id !== assetId);
		setAssets(updatedAssets);
		saveUserDataToLocalStorage(getStorageKey(profile), { Profile: profile, Assets: updatedAssets });
	};

	const getStorageKey = (profile: Profile): string => {
		const { UserName, ProfileKey } = profile;
		return `${UserName}_${ProfileKey}`;
	};

	const updateAssets = (updatedAssets: Asset[]) => {
		setAssets(updatedAssets);
		saveUserDataToLocalStorage(getStorageKey(profile), { Profile: profile, Assets: updatedAssets });
	};

	return {
		profile,
		assets,
		defaultProfile,
		setProfile,
		setAssets,
		updateProfile,
		saveNewProfile,
		addOrUpdateScenario,
		removeScenario,
		loadExistingProfile,
		unloadProfile,
		updateAssets,
	};
};

export default useUserData;
