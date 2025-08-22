import User from '../../schema/userSchema.js'
import bcrypt from 'bcryptjs'
import genToken from '../../jwt/genToken.js'
import { sendMail } from '../../utils/sendMail.js'

//login user funtion
export const loginUser = async (req, res) => {
    const {email, password} = req.body
//send mail to user upon login
    const mail = {
    mailFrom: process.env.EMAIL_USER,
    mailTo: email,
    subject: 'Login Sucessful',
    body: `Hi. You just logged into your account. If this wasn't you, please reply to this email.`
   }
//if password and email are not available. Send an error 
    if(!email || !password){
        return res.status(400).json({message: "Email and Password Required"})
    }

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message: "This user does not exist. Please Register to continue"})//if user does not exist ask user to register
        }

        if(!user.isVerified){
          return res.status(400).json({message: "Please Verify OTP before login"})//if user is not verified, ask the user to verify
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.status(400).json({message: "Invalid login credentials"})//if password is wrong throw an error
        }
       
        user.isActive = true;
        await user.save();

        await sendMail(mail)
        const token = genToken({userId: user._id})
        return res
        .cookie('token', token, {httpOnly: true, sameSite:'strict', secure: false, path: '/'})
        .status(200).json({message: "Login Successful"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}