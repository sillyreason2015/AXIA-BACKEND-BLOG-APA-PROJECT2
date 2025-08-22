import router from 'express'

import { createComment } from '../controllers/commentApi/commentBarrel.js'
import { viewComment, viewComments } from '../controllers/commentApi/commentBarrel.js'
import { updateComment } from '../controllers/commentApi/commentBarrel.js'
import { deleteComment } from '../controllers/commentApi/commentBarrel.js'
import authMiddleware from '../middleware/authMiddleware.js'


const commentRouter = router()

commentRouter
// Route to get all comments (requires authentication)
.get('/all', authMiddleware, viewComments)
// Route to create a comment(requires authentication)
.post('/:id/post', authMiddleware, createComment)
// Route to get a single comment (requires authentication)
.get('/:id', authMiddleware, viewComment)
// Route to update a  comment (requires authentication)
.put('/update/:id', authMiddleware, updateComment)
// Route to delete a comment(requires authentication)
.delete('/delete/:id', authMiddleware, deleteComment)


export default commentRouter