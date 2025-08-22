import User from "../../schema/userSchema.js";

//delete user function
export const deleteUser = async (req, res) => {
    const {id} = req.params
    const {_id, isAdmin} = req.user
    try{
        //check if user exists
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({message: "This user does not exist"})
        }
        //check if the user who made the request is the real user or is an admin
        if(id.toString() !== _id.toString() && !isAdmin){
            return res.status(403).json({message: "You are not authorized to carry out this action"})
        }
        //delete the user
        await User.findByIdAndDelete(id)
        res.status(200).json({message: "User deleted sucessfully"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}