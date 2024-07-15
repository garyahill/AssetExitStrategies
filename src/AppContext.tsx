// src/context/AppContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Profile, Asset } from './models';

interface AppContextType {
	profile: Profile | null;
	assets: Asset[];
	setProfile: (profile: Profile | null) => void;
	setAssets: (assets: Asset[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [profile, setProfile] = useState<Profile | null>(null);
	const [assets, setAssets] = useState<Asset[]>([]);

	return (
		<AppContext.Provider value={{ profile, assets, setProfile, setAssets }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error('useAppContext must be used within an AppProvider');
	}
	return context;
};
