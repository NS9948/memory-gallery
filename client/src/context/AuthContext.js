import { createContext, useEffect, useState } from "react";
import { getToken, removeToken } from "../utils/storage";
import { getCurrentUser } from "../services/authService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const token = getToken();

            if (!token) {
                setLoading(false);
                return;
            }

            const response = await getCurrentUser();

            setUser(response.user);
        } catch (error) {
            console.error(error);
            removeToken();
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const logout = () => {
        removeToken()
        setUser(null)
    }

    const value = {
        user,
        loading,
        checkAuth,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };