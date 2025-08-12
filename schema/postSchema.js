import mongoose from "mongoose";
const Schema = mongoose.Schema
const postSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Post title is required"],
            trim: true,
            maxlength: 150
        },
        content: {
            type: String,
            required: [true, "Post content is required"]
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
         comments: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Comment'
         }]
    },
    { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);
export default Post
