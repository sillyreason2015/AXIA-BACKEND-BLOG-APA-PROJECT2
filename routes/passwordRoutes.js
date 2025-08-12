import router from 'express'
import authMiddleware from '../middleware/authMiddleware.js'

import { requestPassword } from '../controllers/passwordApi/passwordBarrel.js'
import { resetPassword } from '../controllers/passwordApi/passwordBarrel.js'

const passwordRouter = router()


passwordRouter
.post('/request', authMiddleware, requestPassword)
.post('/reset', authMiddleware, resetPassword)

export default passwordRouter

