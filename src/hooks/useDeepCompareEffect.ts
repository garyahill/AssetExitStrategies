import { DependencyList, EffectCallback, useEffect, useRef, useState } from "react";

const useDeepCompareEffect = (callback: EffectCallback, dependencies: DependencyList) => {
	const currentDependenciesRef = useRef<DependencyList>();
	const [isEqual, setIsEqual] = useState<(value: any, other: any) => boolean>();

	useEffect(() => {
		// Dynamically import lodash isEqual
		import("lodash.isequal").then(module => {
			setIsEqual(() => module.default);
		});
	}, []);

	useEffect(() => {
		if (isEqual && !isEqual(currentDependenciesRef.current, dependencies)) {
			currentDependenciesRef.current = dependencies;
		}
	}, [dependencies, isEqual]);

	useEffect(() => {
		if (isEqual) {
			callback();
		}
		// Only run the effect if isEqual is loaded and dependencies change
	}, [isEqual, currentDependenciesRef.current]);
};

export default useDeepCompareEffect;
