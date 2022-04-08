import mongoose from "mongoose";

export const CommentSchemal = new mongoose.Schema(
  {
    content: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
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
