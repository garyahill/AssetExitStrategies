import React from "react";
import { Navigate } from "react-router-dom";
import {useAppContext} from "./hooks/useAppContext";

interface PrivateRouteProps {
	component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
	const { profile } = useAppContext();

	return profile ? (
		<Component {...rest} />
	) : (
		<Navigate to="/login" />
	);
};

export default PrivateRoute;