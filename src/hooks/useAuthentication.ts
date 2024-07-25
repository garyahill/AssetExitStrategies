import { useContext } from "react";
import { AuthContext, AuthContextType }from "../AuthContext";

const useAuthentication = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export default useAuthentication;