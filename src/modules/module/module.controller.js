import { stepType } from "../../constants/model-constant";
import Lesson from "../../model/lesson";
import Module from "../../model/module";
import * as moduleMethods from "./module.method";

export const addNewModule = async (req, res, next) => {
  const { course, body } = req;
  const module = await moduleMethods.createModule(course._id, body.title);
  course.modules.push(module.id);
  course.save();
  return res.json(module);
};

export const getAllModules = async (req, res) => {
  const { modules } = req.course;

  const allModules = await Promise.allSettled(
    modules.map(async (moduleId) => {
      const module = await Module.findById(moduleId);
      return module;
    })
  );
  return res.json({
    modules: allModules,
  });
};

export const getDetail = async (req, res) => {
  const { module } = req;
  return res.json(module);
};

export const editModule = async (req, res) => {
  const { module, body } = req;
  module.title = body.title;
  module.steps = body.steps || module.steps;
  await module.save();
  return res.json(module);
};

export const deleteModule = async (req, res) => {
  const { module, course } = req;
  await Module.findByIdAndDelete(module._id);
  course.modules = course.modules.filter(
    (id) => id.toString() !== module._id.toString()
  );
  course.save();
  return res.json({});
};

export const getStepDetail = async (req, res) => {
  const { step } = req;
  const content = await moduleMethods.getStepContent(step);
  const doc = step._doc;
  doc.content = content;
  return res.json(doc);
};

export const createLesson = async (req, res) => {
  const { title, stepType, time, type, content, url } = req.body;
  const { module } = req;
  const lesson = new Lesson({
    type,
    url,
    content,
  });
  await lesson.save();
  module.steps.push({ title, type: stepType, time, content: lesson._id });
  await module.save();
  return res.json({
    title,
    time,
    type: stepType,
    content: lesson,
  });
};

export const editStep = async (req, res) => {
  const { title, stepType, time, type, content, url } = req.body;
  const { module, step } = req;
  step.title = title;
  step.type = stepType;
  step.time = time;
  let stepIndex = module.steps.findIndex(
    (s) => s._id.toString() === step._id.toString()
  );
  module.steps[stepIndex] = step;
  await module.save();

  const lesson = await moduleMethods.getStepContent(step);
  lesson.type = type;
  lesson.content = content;
  lesson.url = url;
  await lesson.save();

  step.content = lesson;
  res.json({ step });
};

export const deleteStep = async (req, res) => {
  const { module, step } = req;
  module.steps = module.steps.filter(
    (s) => s._id.toString() !== step._id.toString()
  );
  switch (step.type) {
    case stepType.TEST:
      Test.findByIdAndDelete(step.content);
      break;
    default:
      Lesson.findByIdAndDelete(step.content);
      break;
  }
  await module.save();
  return res.json();
};

export const submitTest = async (req, res) => {};

export const getTestAnswer = async (req, res) => {};

export const addComment = async (req, res) => {
  const { user, step } = req;
  let doc;
  switch (step.type) {
    case stepType.TEST:
      doc = await Test.findByIdAndDelete(step.content);
      break;
    default:
      doc = await Lesson.findByIdAndDelete(step.content);
      break;
  }
};

export const getAllComment = async (req, res) => {};

export const deleteComment = async (req, res) => {};

export const completeLesson = async (req, res) => {};
