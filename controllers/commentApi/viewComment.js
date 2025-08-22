import Comment from "../../schema/commentSchema.js"

// Get a single comment by ID
export const viewComment = async (req, res) => {
    const {id} = req.params
    try{
        //find a single comment by id for a single post
     const comment = await Comment.findById(id)
    .select('-_id -__v')
    .populate('author', 'username')
    if(!comment){
        return res.status(400).json({message: "This comment has been deleted"})
    }
    res.status(200).json(comment)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}
// Get all comments for a specific post
export const viewComments = async (req, res) => {
   const {id} = req.params
    try{
        //find all comments for a particular post
        const comments = await Comment.find(id)
        .select('-__v')
        .populate('author', 'username')

        if(!comments.length){
            return res.status(404).json({message: "No comments found for this post"})
        }
        res.status(200).json(comments)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}