import mongoose from "mongoose";
import { CommentSchemal } from "./comment.js";

export const LessonSchemal = new mongoose.Schema(
  {
    time: {
      type: Number,
      required: false,
      default: 0,
    },
    type: {
      type: String,
      required: true,
      enum: ["embed link video", "video", "document", "default"],
    },
    url: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    comments: [CommentSchemal],
  },
  { timestamps: true }
);

const Lesson = mongoose.model("Lesson", LessonSchemal);

export default Lesson;
