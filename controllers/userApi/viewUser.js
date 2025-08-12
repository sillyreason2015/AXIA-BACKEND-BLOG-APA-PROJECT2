import User from "../../schema/userSchema.js";

export const viewUser = async (req, res) => {
    const {id} = req.params
    const {isPrivate} = req.user
    if(isPrivate){
        return res.status({message: "This user limits who can view their posts."})
    }
    try{
        const user = await User.findById(id).select("-lastOtpSentAt -password -_id -updatedAt -createdAt -__v -isPrivate -isAdmin -isVerified -isActive")
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const viewUsers = async (req,res) => {
    const {isAdmin} = req.user
    if(!isAdmin){
        return res.status(400).json({message: 'You are not authorized to carry out this action'})
    }
    try{
        const users = await User.find().select('-id -password -isPrivate -isVerified -createdAt -updatedAt -__v -lastOtpSentAt -isAdmin')
        res.status(200).json(users)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}
   

