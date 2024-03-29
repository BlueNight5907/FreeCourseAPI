import mongoose from "mongoose";
import { stepType } from "../constants/model-constant";

const TestStateSchemal = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userAnswer: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const LearningProcessSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    visited: {
      type: Number,
      required: false,
    },
    learned: [
      {
        stepId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        type: {
          type: String,
          required: true,
          enum: [stepType.LESSON, stepType.TEST],
        },
        testState: [TestStateSchemal],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const LearningProcess = mongoose.model(
  "LearningProcess",
  LearningProcessSchema
);
export default LearningProcess;
