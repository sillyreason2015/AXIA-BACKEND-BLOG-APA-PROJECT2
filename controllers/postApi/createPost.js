import Post from "../../schema/postSchema.js";

//create a new post
export const createPost = async (req, res) => {
    const {title, content} = req.body
    const {_id} = req.user

    // Validate required fields
    if(!title || !content){
        return res.status(400).json({message: "Please enter all fields"})
    }
    // Create a new post
    try{
        const newPost = new Post({
            ...req.body,
            author: _id
        })
        // Save to database
        const savedPost = await newPost.save()
        res.status(200).json({message: "Post Created Successfully!", savedPost})
    }catch(error){
        res.status(500).json({message: error.message})
    }
    
}