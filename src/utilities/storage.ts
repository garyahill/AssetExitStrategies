import log from './logger';
import { UserData } from '../models';

export function getObjectFromLocalStorage(key: string): UserData | null {
	try {
		const item = localStorage.getItem(key);
		if (item) {
			return JSON.parse(item);
		}
		return null;
	} catch (error: any) {
		log.error('Error retrieving object from local storage:', error);
		return null;
	}
}

export function saveObjectToLocalStorage(key: string, value: any): void {
	try {
		const item = JSON.stringify(value);
		localStorage.setItem(key, item);
	} catch (error: any) {
		log.error('Error saving object to local storage:', error);
	}
}