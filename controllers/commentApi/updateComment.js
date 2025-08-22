import Comment from '../../schema/commentSchema.js'

// Function to update a comment
export const updateComment = async (req,res) => {
    const {id} = req.params
    const {content} = req.body
    const {_id, isAdmin} = req.user

    // Validate that content is not empty
    if(!content){
        return res.status(400).json({message: "Coneten cannot be empty"})
    }

    try{
        // Find the comment by its id
        const comment = await Comment.findById(id)
        if(!comment){
            return res.status(404).json({message: "Comment does not exist"})
        }

        if(comment.author.toString() !== _id.toString() && !isAdmin){
            return res.status(403).json("You are not authorized to carry out this action")
        }

         // Update the comment content and return the updated document
        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { content },
            { new: true, runValidators: true } 
        )
        res.status(200).json({messae: "Comment Updated Successfully", updatedComment})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}