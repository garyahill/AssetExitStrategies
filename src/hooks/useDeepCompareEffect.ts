import { DependencyList, EffectCallback, useEffect, useRef } from "react";
import isEqual from "lodash.isequal";

const useDeepCompareEffect = (callback: EffectCallback, dependencies: DependencyList) => {
	const currentDependenciesRef = useRef<DependencyList>();

	if (!isEqual(currentDependenciesRef.current, dependencies)) {
		currentDependenciesRef.current = dependencies;
	}

	useEffect(callback, [currentDependenciesRef.current]);
};

export default useDeepCompareEffect;