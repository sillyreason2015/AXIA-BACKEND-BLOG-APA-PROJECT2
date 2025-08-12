import router from 'express'
import authMiddleware from '../middleware/authMiddleware.js'


import { registerUser } from '../controllers/userApi/userBarrel.js'
import { viewUser, viewUsers } from '../controllers/userApi/userBarrel.js'
import { updateUser } from '../controllers/userApi/userBarrel.js'
import { deleteUser } from '../controllers/userApi/userBarrel.js'



const userRouter = router()

userRouter
.post('/register',registerUser)
.get('/user/:id', authMiddleware, viewUser)
.get('/users', authMiddleware, viewUsers)
.put('/update/:id', authMiddleware, updateUser)
.delete('/delete/:id', authMiddleware, deleteUser)


export default userRouter