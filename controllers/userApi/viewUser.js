import User from "../../schema/userSchema.js"

//  View all users (admin only)
export const viewUsers = async (req, res) => {
    try {
        if (!req.user?.isAdmin) {
            return res.status(403).json({ message: "You are not authorized to carry out this action" })
        }

        const users = await User.find().select(
            "-password -__v -lastOtpSentAt -isAdmin -isPrivate"
        )

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "There are currently no users" })
        }

        res.status(200).json(users)
    } catch (error) {
        console.error("Error fetching users:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}


// View a single user (self or admin)
export const viewUser = async (req, res) => {
    try {
        const { id } = req.params

        if (req.user._id.toString() !== id && !req.user.isAdmin) {
            return res.status(403).json({ message: "You are not authorized to carry out this action" })
        }

        const user = await User.findById(id).select(
            "-password -__v -lastOtpSentAt -isAdmin -isPrivate"
        )

        if (!user) {
            return res.status(404).json({ message: "This user does not exist. Please register to continue" })
        }

        res.status(200).json(user)
    } catch (error) {
        console.error("Error fetching user:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
