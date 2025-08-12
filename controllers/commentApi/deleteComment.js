import Comment from "../../schema/commentSchema.js";
import Post from '../../schema/postSchema.js'


export const deleteComment = async (req, res) => {
    const {id} = req.params
    const {_id, isAdmin} = req.user

    try{
        const comment = await Comment.findById(id)
        if(!comment){
            return res.status(404).json({message: "Comment not found"})
            }
            if(comment.author.toString() !== _id.toString() && !isAdmin){
                    return res.status(403).json({message: "You are not authorized to carry out this action"})
        }

        await Post.findByIdAndDelete(comment.post, {$pull: {comments: comment._id}})
   
        await Comment.findByIdAndDelete(id)

        res.status(200).json({message: "Comment deleted successfully"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

