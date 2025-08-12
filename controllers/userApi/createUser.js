import User from "../../schema/userSchema.js";
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { sendMail } from "../../utils/sendMail.js";

dotenv.config()

export const registerUser = async(req, res)=>{
    const {username, displayName, password, email } = req.body

    if(!username || !displayName || !password || !email){
        return res.status(400).json({message: "Please enter all fields"})
    }
    try{
        const user = await User.findOne({email}, {username})
        if(user){
           return res.status(400).json({message: "This User already exists"})
        }
        const otp = Math.floor(100000 +Math.random() * 90000)
        const otpExpires = new Date(Date.now() + 1000 * 60 * 5).toISOString()
        

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            ...req.body, 
            password: hashedPassword, 
            otp,
            otpExpires
        })

        await newUser.save()

        const mailObj = {
            mailFrom: process.env.EMAIL_USER,
            mailTo: email,
            subject: "New User Registration Successful",
            body: `Hi ${displayName}. Thank you for registering with us. Your verification code is ${otp} and it expires in 5 minutes`
        }
        await sendMail(mailObj)
        res.status(200).json({message: "New user registration successful. Your otp has been sent to your registered email"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}