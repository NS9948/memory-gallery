import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const SpaceContext = createContext();

const SpaceProvider = ({ children }) => {
    const [space, setSpace] = useState(null);
    const [status, setStatus] = useState("NONE");
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();

    const createSpace = () => {
        setSpace({
            id: "xyz",
            inviteCode: "ABC123",
            members: [user]
        });

        setStatus("WAITING");
    };

    const value = {
        space,
        setSpace,
        status,
        setStatus,
        loading,
        setLoading,
        createSpace
    };

    return (
        <SpaceContext.Provider value={value}>
            {children}
        </SpaceContext.Provider>
    );
};

export const useSpace = () => {
    return useContext(SpaceContext);
};

export { SpaceContext, SpaceProvider };