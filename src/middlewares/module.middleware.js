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
