import router from 'express'
import authMiddleware from '../middleware/authMiddleware.js'

import { verifyOtp} from '../controllers/otpApi/otpBarrel.js'
import { resendOtp} from '../controllers/otpApi/otpBarrel.js'

const otpRouter = router()


otpRouter
.post('/verify',verifyOtp )
.post('/resend',resendOtp)

export default otpRouter