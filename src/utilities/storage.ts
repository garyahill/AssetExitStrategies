// TODO: Replace any with the appropriate type
// eslint-disable-next-line
export function getObjectFromLocalStorage(key: string): any | null {
	try {
		const item = localStorage.getItem(key);
		if (item) {
			return JSON.parse(item);
		}
		return null;
	} catch (error) {
		// TODO: Replace console.error with a logger
		// eslint-disable-next-line no-console
		console.error('Error retrieving object from local storage:', error);
		return null;
	}
}