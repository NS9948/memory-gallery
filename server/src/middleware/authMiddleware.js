import { verifyToken } from "../utils/jwt.js"

const authMiddleware = (req,res,next) => {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader){
            return res.status(401).json({
                success: false,
                message: "No authorization header found"
            })
        }

        const isValidAuthHeader = authHeader.startsWith("Bearer ")

        if(!isValidAuthHeader){
            return res.status(401).json({
                success: false,
                message: "Not a valid authorization header"
            })
        }

        const token = authHeader.split(" ")[1]

        const decoded = verifyToken(token)

        req.user = decoded
        console.log("Authorization Header:", authHeader);

const tokenn = authHeader.split(" ")[1];
console.log("Extracted Token:", tokenn);

const decodedd = verifyToken(token);
console.log("Decoded:", decodedd);

        next();

    } catch (error) {
        console.error(error)
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        })
    }
}

export default authMiddleware;