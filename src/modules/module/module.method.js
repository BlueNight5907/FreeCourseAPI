import { stepType } from "../../constants/model-constant";
import Lesson from "../../model/lesson";
import Module from "../../model/module";
import Test from "../../model/test";
import { getDataFromAllSettled } from "../../utils/array-utils";

export const createModule = async (courseId, title) => {
  const module = new Module({ title, courseId, steps: [] });
  await module.save();
  return module;
};

export const getStepContent = async (step) => {
  let content;
  switch (step.type) {
    case stepType.TEST:
      content = await Test.findById(step.content);
      break;
    default:
      content = await Lesson.findById(step.content);
      break;
  }
  return content;
};
