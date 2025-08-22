import Post from "../../schema/postSchema.js";

//update post logic
export const updatePost = async (req,res) => {
    const {id} = req.params
    const {_id, isAdmin} = req.user
    try{
        // Find the post
        const post = await Post.findById(id)
        if(!post){
            return res.status(404).json({message: "This post does not exist or has been deleted"})
        }
        //only the user who made the post or the admin can update the post
        if(post.author.toString() !== _id.toString() && !isAdmin){
            return res.status(403).json({message: "You are not authorized to carry out this action"})
        }

        // Update and return updated document
        await Post.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true, runValidators: true }
        ).select('-_id -author._id ')
        
        res.status(200).json({message: "Post updated Successfully"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}