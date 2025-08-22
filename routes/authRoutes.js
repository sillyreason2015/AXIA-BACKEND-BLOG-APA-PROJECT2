import router from 'express'
import authMiddleware from '../middleware/authMiddleware.js'

// Route to log in a user
import { loginUser } from '../controllers/authApi/loginUser.js'
// Route to log out a user
import { logoutUser } from '../controllers/authApi/logoutUser.js'



const authRouter = router()
//authentication routes
authRouter
.post('/login',loginUser)
.post('/logout',authMiddleware, logoutUser)

export default authRouter