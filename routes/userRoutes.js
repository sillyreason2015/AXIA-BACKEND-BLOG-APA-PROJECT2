import router from 'express'
import authMiddleware from '../middleware/authMiddleware.js'


import { registerUser } from '../controllers/userApi/userBarrel.js'
import { viewUser, viewUsers } from '../controllers/userApi/userBarrel.js'
import { updateUser } from '../controllers/userApi/userBarrel.js'
import { deleteUser } from '../controllers/userApi/userBarrel.js'



const userRouter = router()

userRouter
.post('/register', authMiddleware, registerUser)
.get('/user', authMiddleware, viewUser)
.get('/users', authMiddleware, viewUsers)
.put('/update', authMiddleware, updateUser)
.delete('/delete', authMiddleware, deleteUser)


export default userRouter