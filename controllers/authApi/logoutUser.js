import User from "../../schema/userSchema.js"
//logout user function
export const logoutUser = async (req, res) => {
    try{
        res
        .clearCookie('token', {
            httpOnly: true,
            sameSite: 'strict', 
            secure: false,
            path: '/'
        })
        await User.findByIdAndUpdate(req.user._id, { isActive: false })//if user logs out change the user's active status to fals
        return res.status(200).json({message: "Logout successful"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}