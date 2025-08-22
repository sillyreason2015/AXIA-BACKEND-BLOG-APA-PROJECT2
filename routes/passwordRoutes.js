import router from 'express'
import authMiddleware from '../middleware/authMiddleware.js'

import { requestPassword } from '../controllers/passwordApi/passwordBarrel.js'
import { resetPassword } from '../controllers/passwordApi/passwordBarrel.js'

const passwordRouter = router()


passwordRouter
//Route to request a password reset link
.post('/request', authMiddleware, requestPassword)
// Route to reset password using the token
.post('/reset', authMiddleware, resetPassword)

export default passwordRouter

