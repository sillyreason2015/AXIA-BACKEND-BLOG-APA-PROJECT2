import router from 'express'
import authMiddleware from '../middleware/authMiddleware.js'


import { loginUser } from '../controllers/authApi/loginUser.js'
import { logoutUser } from '../controllers/authApi/logoutUser.js'



const authRouter = router()

authRouter
.post('/login',loginUser)
.post('/logout',authMiddleware, logoutUser)

export default authRouter