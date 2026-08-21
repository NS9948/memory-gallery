import api from "./api";

const getMySpace = async () => {
    const response = await api.get("/spaces/me");
    return response.data.data;
};

const createSpace = async (name) => {
    const response = await api.post("/spaces", {
        name
    });
    return response.data.data;
};

const joinSpace = async (inviteCode) => {
    const response = await api.post("/spaces/join", {
        inviteCode
    });
    return response.data.data;
};

export {
    getMySpace,
    createSpace,
    joinSpace
};