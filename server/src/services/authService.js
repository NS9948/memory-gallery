import User from "../models/User.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwt.js"

const registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({email})
    
    if(existingUser){
        const error = new Error("User already exists")
        error.statusCode = 409
        throw error
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    return user
}

const loginUser = async ({email,password}) => {
    const user = await User.findOne({email}).select("+password")

    if(!user){
        const error = new Error("Invalid email or password.")
        error.statusCode = 401
        throw error
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)


    if(!isPasswordValid){
        const error = new Error("Invalid email or password.")
        error.statusCode = 401
        throw error
    }

    const payload = {
        id: user._id,
        role: user.role
    }

    const token = generateToken(payload)

    return {
        user,
        token
    };
}

const getCurrentUser = async (userId) => {
    const user = await User.findById(userId).select("-password")
    if(!user) {
        const error = new Error("User not found")
        error.statusCode = 404
        throw error
    }

    return user

}

export {registerUser, loginUser,getCurrentUser}