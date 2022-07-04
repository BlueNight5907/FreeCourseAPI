import mongoose from "mongoose";
import { CommentSchemal } from "./comment.js";

const PostSchemal = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
    backgroundUrl: {
      type: String,
      required: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
      },
    ],
    comments: [CommentSchemal],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchemal);

export default Post;
