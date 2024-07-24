import React, { createContext, useState, ReactNode } from "react";
import { Profile, Asset, UserData, AppState } from "./models";


interface AppContextType {
	profile: Profile;
	assets: Asset[];
	appState: AppState;
	setProfile: (profile: Profile) => void;
	setAssets: (assets: Asset[]) => void;
	setAppState: (appState: AppState) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const defaultProfile: Profile = { Name: "", UserName: "", ProfileKey: "" };

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	// TODO: The commented code below is the code to be used in the final implementation
	// const [profile, setProfile] = useState<Profile>(defaultProfile);
	// const [assets, setAssets] = useState<Asset[]>([]);
	const [appState, setAppState] = useState<AppState>({ addingAsset: false });

	// TODO: The code below is for testing and developement purposes only
	const TESTING_STORAGE_KEY = "garyahill_1234";

	const [profile, setProfile] = useState<Profile>(() => {
		const storedProfile = localStorage.getItem(TESTING_STORAGE_KEY);
		if (storedProfile) {
			const userData: UserData = JSON.parse(storedProfile);
			return userData.Profile;
		}
		return defaultProfile;
	});

	const [assets, setAssets] = useState<Asset[]>(() => {
		const storedProfile = localStorage.getItem(TESTING_STORAGE_KEY);
		if (storedProfile) {
			const userData: UserData = JSON.parse(storedProfile);
			return userData.Assets;
		}
		return [];
	});
	// TODO: The code above is for testing and developement purposes only

	return (
		<AppContext.Provider value={{ profile, assets, appState, setProfile, setAssets, setAppState }}>
			{children}
		</AppContext.Provider>
	);
};
