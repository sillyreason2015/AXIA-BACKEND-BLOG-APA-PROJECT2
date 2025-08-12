import Post from "../../schema/postSchema.js";


export const createPost = async (req, res) => {
    const {title, content} = req.body
    const {_id} = req.user
    if(!title || !content){
        return res.status(400).json({message: "Please enter all fields"})
    }

    try{
        const newPost = new Post({
            ...req.body,
            author: _id
        })
        const savedPost = await newPost.save()
        res.status(200).json({message: "Post Created Successfully!", savedPost})
    }catch(error){
        res.status(500).json({message: error.message})
    }
    
}