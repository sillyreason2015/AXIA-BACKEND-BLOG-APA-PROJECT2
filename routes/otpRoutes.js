import router from 'express'
import authMiddleware from '../middleware/authMiddleware.js'

import { verifyOtp} from '../controllers/otpApi/otpBarrel.js'
import { resendOtp} from '../controllers/otpApi/otpBarrel.js'

const otpRouter = router()


otpRouter
// Route to verify OTP
.post('/verify',verifyOtp )
// Route to resend OTP
.post('/resend',resendOtp)

export default otpRouter