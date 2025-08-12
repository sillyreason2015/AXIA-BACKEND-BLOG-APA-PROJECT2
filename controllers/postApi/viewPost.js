import Post from "../../schema/postSchema.js";

export const viewPost = async (req, res) => {
    const {id} = req.params
    
    try{
        const post = await Post.findById(id)
        .select('-_id -userId -__v')
        .populate('author', 'username isPrivate')
        if(!post){
            return res.status(404).json({message: "This post does not exist or has been deleted by the user"})
        }
        if(post.author.isPrivate){
            return res.status(403).json({message: "This user's post are private"})
        }
        res.status(200).json(post)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}


export const viewPosts = async (req, res) => {
    try{
        const posts = await Post.find().populate('author', 'username isPrivate')
        .select('-id -updatedAt -__v')
        if(posts.length === 0){
            return res.status(400).json({message: "This user has no posts"})
        }
         const publicPosts = posts.filter(post => !post.author.isPrivate)
         
        res.status(200).json(publicPostsosts)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}