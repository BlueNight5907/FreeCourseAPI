import mongoose from "mongoose";
import { CommentSchemal } from "./comment.js";
const LevelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const RateSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    point: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CourseSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
      },
    ],
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    shortDesc: {
      type: String,
      required: false,
      default: "",
    },
    background: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    rates: [RateSchema],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    gains: [{ type: String }],
    comments: [CommentSchemal],
    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Level = mongoose.model("Level", LevelSchema);

const Course = mongoose.model("Course", CourseSchema);
export default Course;
