import Module from "../../model/module";

export const createModule = async (courseId, title) => {
  const module = new Module({ title, courseId, steps: [] });
  await module.save();
  return module;
};
