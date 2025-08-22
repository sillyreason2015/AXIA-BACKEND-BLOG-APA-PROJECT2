import Post from "../../schema/postSchema.js";

//view a single post 
export const viewPost = async (req, res) => {
    const {id} = req.params
    
    try{
         // find the post by its ID
        const post = await Post.findById(id)
        .select('-_id -userId -__v')
        .populate('author', 'username isPrivate')
        .populate({
                path: 'comments',
                select: 'content author createdAt', // only the fields you want
                populate: { path: 'author', select: 'username' } // populate author inside comment
            })
            // if no post found, return 404
        if(!post){
            return res.status(404).json({message: "This post does not exist or has been deleted by the user"})
        }
        // block the request if author has private posts
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
        .select('-author._id -updatedAt -__v -createdAt -_id')
        .populate({
                path: 'comments',
                select: 'content author createdAt', // only the fields you want
                populate: { path: 'author', select: 'username' } // populate author inside comment
            })
        if(posts.length === 0){
            return res.status(400).json({message: "This user has no posts"})
        }
         const publicPosts = posts.filter(post => !post.author.isPrivate)
         
        res.status(200).json(publicPosts)
    }catch(error){
        res.status(500).json({message: error.message})
        console.log(error);
    }
}