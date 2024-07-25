import React from "react";
import { Navigate } from "react-router-dom";
import useAuthentication from "./hooks/useAuthentication";

interface PrivateRouteProps {
	component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
	const { isAuthenticated  } = useAuthentication();

	return (
		isAuthenticated ? (
			<Component {...rest} />
		) : (
			<Navigate to="/login" />
		)
	);
};

export default PrivateRoute;