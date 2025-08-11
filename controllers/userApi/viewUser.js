import User from "../../schema/userSchema.js";

export const viewUser = async(req, res){
    const {id} = req.params
    const {private} = req.user.isPrivate
    if(private){
        return res.status({message: "This user limits who can view their posts."})
    }
    try{
        const user = await User.findById(id).select("-password -_id -updatedAt -createdAt -__v -isPrivate -isAdmin -isVerified -isActive")
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}
