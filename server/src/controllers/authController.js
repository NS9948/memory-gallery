import { getCurrentUser, loginUser, registerUser } from "../services/authService.js"

const registerController = async (req,res) => {
    try {
        const {name, email, password} = req.body
        const user = await registerUser({ name, email, password })
        
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        console.error(error)

        const statusCode = error.statusCode || 500
        return res.status(statusCode).json({
            success: false,
            message: statusCode === 500 ? 
                "Internal server error" : error.message
        })
    }
}

const loginController = async (req,res) => {
    try {
        const {email, password} = req.body
        const {user,token} = await loginUser({email, password})

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        })
    } catch (error) {
        console.error(error)

        const statusCode = error.statusCode || 500
        return res.status(statusCode).json({
            success: false,
            message: statusCode === 500 ?
                "Internal server error" : error.message
        })
    }
}

const getCurrentUserController = async (req,res) => {
    try {
        const user = await getCurrentUser(req.user.id)
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.error(error)

        const statusCode = error.statusCode || 500
        return res.status(statusCode).json({
            success: false,
            message: statusCode === 500 ?
                "Internal server error" : error.message
        })
    }
}

export {registerController, loginController, getCurrentUserController}