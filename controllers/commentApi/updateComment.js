import Comment from '../../schema/commentSchema.js'


export const updateComment = async (req,res) => {
    const {id} = req.params
    const {content} = req.body
    const {_id, isAdmin} = req.user

    if(!content){
        return res.status(400).json({message: "Coneten cannot be empty"})
    }

    try{
        const comment = await Comment.findById(id)
        if(!comment){
            return res.status(404).json({message: "Comment does not exist"})
        }

        if(comment.author.toString() !== _id.toString() && !isAdmin){
            return res.status(403).json("You are not authorized to carry out this action")
        }

        comment.content = content
        await comment.save()

        res.status(200).json({messae: "Comment Updated Successfully", comment})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}