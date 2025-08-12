import mongoose from "mongoose";
const Schema = mongoose.Schema
const commentSchema = new Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        content: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);
const Comment = mongoose.model("Comment", commentSchema);
export default Comment
