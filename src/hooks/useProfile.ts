// src/hooks/useProfile.ts
import { useState } from 'react';
import { Profile } from '../models';

const useProfile = () => {
	const [profile, setProfile] = useState<Profile>({
		Name: '',
		UserName: '',
		ProfileKey: '',
	});

	const updateProfile = (name: string, value: string) => {
		setProfile(prevProfile => ({
			...prevProfile,
			[name]: value,
		}));
	};

	const saveProfile = () => {
		// Here you would typically save the profile to the context or an API
	};

	const loadProfile = () => {
		// Code to load the profile and store in the context
	};

	return {
		profile,
		updateProfile,
		saveProfile,
		loadProfile,
	};
};

export default useProfile;
