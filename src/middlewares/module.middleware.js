import { StatusCodes as httpStatus } from "http-status-codes";
import { APIError } from "../common/APIError";
import Course from "../model/course";
import LearningProcess from "../model/learning-process";
import Module from "../model/module";

export const existModule = async (req, res, next) => {
  const errorResponse = new APIError(
    "Không tìm thấy chương!!!",
    httpStatus.BAD_REQUEST,
    true
  );
  const { moduleId } = req.params;
  try {
    const module = await Module.findById(moduleId);
    if (!module) {
      throw errorResponse;
    }
    req.module = module;
    return next();
  } catch (_) {
    return next(errorResponse);
  }
};

export const existLearningProcess = async (req, res, next) => {
  const errorResponse = new APIError(
    "Chưa tham gia vào khóa học này!!",
    httpStatus.CONFLICT,
    true
  );
  const { user, module } = req;
  const course = await Course.findById(module.courseId);
  const learningProcess = await LearningProcess.findOne({
    accountId: user._id,
    courseId: course._id,
  });
  if (!learningProcess) {
    return next(errorResponse);
  }
  req.learningProcess = learningProcess;
  return next();
};

export const existStep = async (req, res, next) => {
  const errorResponse = new APIError(
    "Không tìm thấy bài học!!!",
    httpStatus.BAD_REQUEST,
    true
  );
  const { stepId } = req.params;
  const { module } = req;
  try {
    const step = module.steps.filter((item) => item._id.toString() === stepId);
    if (step.length === 0) {
      throw errorResponse;
    }
    req.step = step[0];
    return next();
  } catch (_) {
    return next(errorResponse);
  }
};
