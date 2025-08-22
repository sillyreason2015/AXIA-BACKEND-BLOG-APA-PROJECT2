import User from '../../schema/userSchema.js'
import { sendMail } from '../../utils/sendMail.js'
import crypto from 'crypto'

export const requestPassword = async (req, res) => {
    const {email} = req.body
    try{
         // Find the user by email
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "User not found. Please Register first to continue"})
        }

        // Generate a secure token
        const token = crypto.randomBytes(32).toString('hex')
        user.passwordResetToken = token 
        user.passwordResetExpires = Date.now() + 30 * 60 * 1000
        await user.save()

         // Send password reset email
        await sendMail ({
            mailFrom: process.env.EMAIL_USER,
            mailTo: email,
            subject: "Password Reset",
            body:`
            Hello ${user.username}, you recently made a new password request. 
            <p>Click on the link to reset your password</p> 
            <a href = "http://localhost:4000/password/reset/${token}">Reset Password</a>`
        })
        res.status(200).json({message: "Password Reset request sent Successfully"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}