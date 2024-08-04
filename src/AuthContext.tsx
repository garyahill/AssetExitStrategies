// AuthContext.tsx
import React, { createContext, useState, ReactNode, FC, useEffect } from "react";

export interface AuthContextType {
	isAuthenticated: boolean;
	login: () => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	// TODO: DEV CODE: Having this block of code allows you to bypass the login screen in development
	// useEffect(() => {
	// 	if (process.env.NODE_ENV === "development") {
	// 		setIsAuthenticated(true);
	// 	}
	// }, []);

	const login = () => setIsAuthenticated(true);
	const logout = () => setIsAuthenticated(false);

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

