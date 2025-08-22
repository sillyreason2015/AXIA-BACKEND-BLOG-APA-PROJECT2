import jwt from 'jsonwebtoken'
import User from '../schema/userSchema.js'

const authMiddleware = async (req, res, next) => {
    const accessToken = req.cookies.token
    const jwtSecret = process.env.ACCESS_TOKEN

    // Check if token exists in cookies
    if (!accessToken) {
        return res.status(401).json({ message: "Please Login First" })
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(accessToken, jwtSecret)
        const userId = decoded.userId
        // Ensure the token contains a valid userId
        if (!userId) {
            return res.status(401).json({ message: "Invalid Token" })
        }

        const verifiedUser = await User.findById(userId)
        if (!verifiedUser) {
            return res.status(401).json({ message: "Invalid User" })
        }
        // Attach user information to the request object
        req.user = {
            _id: verifiedUser._id.toString(),
            isAdmin: !!verifiedUser.isAdmin,
            email: verifiedUser.email,       
            username: verifiedUser.username 
        }

        next()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default authMiddleware
