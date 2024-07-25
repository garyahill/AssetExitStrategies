import useAppContext from "./useAppContext";

const useAppState = () => {
	const { appState, setAppState } = useAppContext();

	return {
		appState,
		setAppState,
	};
};

export default useAppState;
