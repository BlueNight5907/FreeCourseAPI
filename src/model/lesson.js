import mongoose from "mongoose";
import { CommentSchemal } from "./comment.js";

export const LessonSchemal = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["youtube", "video", "document", "default"],
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
