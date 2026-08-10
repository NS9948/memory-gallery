const TOKEN_KEY = "token";
const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
}

const getToken = () => {
    const token = localStorage.getItem(TOKEN_KEY)
    return token
}

const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}

export {
    saveToken,
    getToken,
    removeToken
}