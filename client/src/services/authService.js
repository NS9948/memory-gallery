import api from "./api"

const registerUser = async (formData) => {
    const response = await api.post("/auth/register", formData)
    return response.data
}

const loginUser = async (formData) => {
    const response = await api.post("/auth/login", formData)
    return response.data 
}

export {registerUser, loginUser}