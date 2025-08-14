import router from 'express'

import { createComment } from '../controllers/commentApi/commentBarrel.js'
import { viewComment, viewComments } from '../controllers/commentApi/commentBarrel.js'
import { updateComment } from '../controllers/commentApi/commentBarrel.js'
import { deleteComment } from '../controllers/commentApi/commentBarrel.js'
import authMiddleware from '../middleware/authMiddleware.js'


const commentRouter = router()

commentRouter
.get('/all', authMiddleware, viewComments)
.post('/:id/post', authMiddleware, createComment)
.get('/:id', authMiddleware, viewComment)
.put('/update/:id', authMiddleware, updateComment)
.delete('/delete/:id', authMiddleware, deleteComment)


export default commentRouter