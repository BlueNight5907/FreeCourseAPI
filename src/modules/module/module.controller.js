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

export const getStepDetail = async (req, res) => {};

export const createNewStep = async (req, res) => {};

export const editStep = async (req, res) => {};

export const deleteStep = async (req, res) => {};

export const submitTest = async (req, res) => {};

export const getTestAnswer = async (req, res) => {};

export const addComment = async (req, res) => {};

export const getAllComment = async (req, res) => {};

export const deleteComment = async (req, res) => {};

export const completeLesson = async (req, res) => {};
