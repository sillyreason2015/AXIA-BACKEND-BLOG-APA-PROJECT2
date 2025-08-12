import Post from "../../schema/postSchema.js";


export const deletePost = async (req,res) => {
    const {id} = req.params
    const {_id, isAdmin} = req.user
    try{
        const post = await Post.findById(id)
        if(!post){
            return res.status(404).json({message: "This post does not exist or has been deleted"})
        }
        if(post.author.toString() !== _id.toString() && !isAdmin){
            return res.status(403).json({message: "You are not authorized to carry out this action"})
        }
        await post.findByIdAndDelete(id)
        res.status(200).json({message: "Post deleted Successfully"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}