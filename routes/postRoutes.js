import router from 'express'

import { createPost } from '../controllers/postApi/postBarrel.js'
import { viewPost, viewPosts } from '../controllers/postApi/postBarrel.js'
import { updatePost } from '../controllers/postApi/postBarrel.js'
import { deletePost } from '../controllers/postApi/postBarrel.js'
import authMiddleware from '../middleware/authMiddleware.js'


const postRouter = router()

postRouter
// Route to create a new post
.post('/create', authMiddleware, createPost)

// Route to get all posts (public posts only are filtered in controller)
.get('/all', authMiddleware, viewPosts)

// Route to get a single post by ID
.get('/:id', authMiddleware, viewPost)

// Route to update a post by ID
.put('/update/:id', authMiddleware, updatePost)

// Route to delete a post by ID
.delete('/delete/:id', authMiddleware, deletePost)

export default postRouter