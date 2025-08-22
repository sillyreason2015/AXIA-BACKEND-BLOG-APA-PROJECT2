import Comment from "../../schema/commentSchema.js";
import Post from "../../schema/postSchema.js";
import { sendMail } from "../../utils/sendMail.js";

//create comment function
export const createComment = async (req, res) => {
    const {content} = req.body
    const {id} = req.params
    const {_id, username} = req.user
  // find the post by id and also get the author's username and email
    const post = await Post.findById(id).populate('author', 'username email')
  // check if the content is empty
    if(!content){
        return res.status(400).json({message: "Field cannot be empty"})
    }
    
    // check if post exists
    if(!post){
        return res.status(400).json({message: "This post does not exist or has beeen deleted by the user"})
    }

  try{
    const newComment = new Comment({
        ...req.body,
        author: _id,
        post: id
    })
    await newComment.save()
    // add this comment id to post's comments array
    post.comments.push(newComment._id)
    await post.save()

    if (!post.author || !post.author.email) {
    console.log("Author info missing for email");
    //send an email to the user if a comment was made on their post
} else {
    const mailObj = {
      mailFrom: process.env.EMAIL_USER,
      mailTo: post.author.email,
      subject: `New comment on your post by ${req.user.username}`,
      body: `Hi ${post.author.username},\n\nYour post titled "${post.title}" just received a new comment.\n\nComment content:\n"${content}"\n\nBest,\nYour Blog Team`,
    };
    await sendMail(mailObj);
}

    res.status(200).json({message: "Comment created Sucessfully"})
  }catch(error){
    res.status(500).json({message: error.message})
  }
}