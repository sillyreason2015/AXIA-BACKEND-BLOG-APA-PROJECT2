import router from 'express'


import { loginUser } from '../controllers/authApi/loginUser.js'
import { logoutUser } from '../controllers/authApi/logoutUser.js'



const authRouter = router()

authRouter
.post('/login',loginUser)
.post('/logout',logoutUser)

export default authRouter