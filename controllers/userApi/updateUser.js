import User from '../../schema/userSchema.js';
import bcrypt from 'bcryptjs';

//update user function
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { _id, isAdmin} = req.user;
    //make sure the user making the request is the real user or an admin
    if (_id.toString() !== id && !isAdmin) {
        return res.status(403).json({ message: "You are not authorized to carry out this action" });
    }

    try {
        const update = { 
            ...req.body 
        };
         //  Hash password if updated
        if (update.password) {
            const salt = await bcrypt.genSalt(10);
            update.password = await bcrypt.hash(update.password, salt);
        }
        //  Update user
        const user = await User.findByIdAndUpdate(
            id,
            update,
            { new: true, runValidators: true }
        ).select('-_id -id -password -isPrivate -isVerified -createdAt -updatedAt -__v -lastOtpSentAt -isAdmin')

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User updated successfully",
            user
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
