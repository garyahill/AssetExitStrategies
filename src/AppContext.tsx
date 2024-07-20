import React, { createContext, useState, ReactNode } from "react";
import { Profile, Asset, UserData } from "./models";

interface AppContextType {
	profile: Profile;
	assets: Asset[];
	setProfile: (profile: Profile) => void;
	setAssets: (assets: Asset[]) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const defaultProfile: Profile = { Name: "", UserName: "", ProfileKey: "" };

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	// TODO: The commented code below is the code to be used in the final implementation
	// const [profile, setProfile] = useState<Profile>(defaultProfile);
	// const [assets, setAssets] = useState<Asset[]>([]);

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
		<AppContext.Provider value={{ profile, assets, setProfile, setAssets }}>
			{children}
		</AppContext.Provider>
	);
};
