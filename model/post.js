import mongoose from "mongoose";
import { CommentSchemal } from "./comment.js";

const PostSchemal = new mongoose.Schema(
  {
    content: {
      type: String,
      required: false,
    },
    likes: [
      {
        accountId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Account",
        },
      },
    ],
    comments: [CommentSchemal],
  },
  { timestamps: true }
);
