import mongoose from "mongoose";
import { CommentSchemal } from "./comment.js";

const QuestionSchemal = new mongoose.model({
  question: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["multi", "single"],
  },
  answers: [],
  correctAnswer: [],
});

export const TestSchemal = new mongoose.Schema(
  {
    time: {
      type: Number,
      required: false,
      default: 0,
    },
    content: {
      type: String,
      required: false,
    },
    comments: [CommentSchemal],
    questions: [QuestionSchemal],
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", TestSchemal);

export default Test;
