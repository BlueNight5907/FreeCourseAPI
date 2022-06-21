import mongoose from "mongoose";

export const CommentSchemal = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
      },
    ],
  },
  { timestamps: true }
);
