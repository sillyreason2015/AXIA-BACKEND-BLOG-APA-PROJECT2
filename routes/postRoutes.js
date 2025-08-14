import router from 'express'

import { createPost } from '../controllers/postApi/postBarrel.js'
import { viewPost, viewPosts } from '../controllers/postApi/postBarrel.js'
import { updatePost } from '../controllers/postApi/postBarrel.js'
import { deletePost } from '../controllers/postApi/postBarrel.js'
import authMiddleware from '../middleware/authMiddleware.js'


const postRouter = router()

postRouter
.post('/create', authMiddleware, createPost)
.get('/all', authMiddleware, viewPosts)
.get('/:id', authMiddleware, viewPost)
.put('/update/:id', authMiddleware, updatePost)
.delete('/delete/:id', authMiddleware, deletePost)

export default postRouter