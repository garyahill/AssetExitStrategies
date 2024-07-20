// AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode, FC, useEffect } from "react";

interface AuthContextType {
	isAuthenticated: boolean;
	login: () => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			setIsAuthenticated(true);
		}
	}, []);

	const login = () => setIsAuthenticated(true);
	const logout = () => setIsAuthenticated(false);

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
