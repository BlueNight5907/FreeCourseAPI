import mongoose from "mongoose";
import { stepType } from "../constants/model-constant.js";
const StepSchemal = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [stepType.LESSON, stepType.TEST],
    },
    time: {
      type: Number,
      required: true,
      default: 0,
    },
    content: {
      type: mongoose.Schema.Types.ObjectId,
      //maybe lesson Id or test Id, depend on step type
    },
  },
  {
    timestamps: true,
  }
);

const ModuleSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    title: {
      type: String,
      required: true,
    },
    steps: [StepSchemal],
  },
  {
    timestamps: true,
  }
);

const Module = mongoose.model("Module", ModuleSchema);
export default Module;
