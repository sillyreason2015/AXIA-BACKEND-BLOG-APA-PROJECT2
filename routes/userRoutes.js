import router from 'express'
import authMiddleware from '../middleware/authMiddleware.js'


import { registerUser } from '../controllers/userApi/userBarrel.js'
import { viewUser, viewUsers } from '../controllers/userApi/userBarrel.js'
import { updateUser } from '../controllers/userApi/userBarrel.js'
import { deleteUser } from '../controllers/userApi/userBarrel.js'



const userRouter = router()

userRouter
// Route to register a new user
.post('/register',registerUser)

// Route to view a single user by ID (self or admin only)
.get('/user/:id', authMiddleware, viewUser)

// Route to view all users (admin only)
.get('/users', authMiddleware, viewUsers)

// Route to update a user by ID (self or admin only)
.put('/user/update/:id', authMiddleware, updateUser)

// Route to delete a user by ID (self or admin only)
.delete('/user/delete/:id', authMiddleware, deleteUser)


export default userRouter