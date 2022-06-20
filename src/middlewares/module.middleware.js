import { StatusCodes as httpStatus } from "http-status-codes";
import { APIError } from "../common/APIError";
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
