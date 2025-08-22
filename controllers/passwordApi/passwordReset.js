import User from "../../schema/userSchema.js"
import bcrypt from 'bcryptjs'


export const resetPassword = async (req, res) => {
    const {token, newPassword} = req.body

    try{
         // Find user with valid token
        const user = await User.findOne({passwordResetToken: token, passwordResetExpires: {$gt: Date.now()}})
        if (!user){
            return res.status(400).json({message: "Password Reset token is Invalid/ Expired"})
        }

        // Hash the new password and save
        user.password = bcrypt.hashSync(newPassword, 10)
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined

        //save the password
        await user.save()
        return res.status(200).json({message: "Password Reset Successfully! Please Proceed to login"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}