import router from 'express'
import authMiddleware from '../middleware/authMiddleware.js'

import { verifyOtp} from '../controllers/otpApi/otpBarrel.js'
import { resendOtp} from '../controllers/otpApi/otpBarrel.js'

const otpRouter = router()


otpRouter
.post('/verify',authMiddleware, verifyOtp )
.post('/resend', authMiddleware, resendOtp)

export default otpRouter