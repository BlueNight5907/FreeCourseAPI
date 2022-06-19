import { StatusCodes as httpStatus } from "http-status-codes";
import { APIError } from "../common/APIError";
import Course from "../model/course";

export const existCourse = async (req, res, next) => {
  const errorResponse = new APIError(
    "Không tìm thấy khóa học!!!",
    httpStatus.BAD_REQUEST,
    true
  );
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      throw errorResponse;
    }
    req.course = course;
    return next();
  } catch (error) {
    return next(errorResponse);
  }
};
