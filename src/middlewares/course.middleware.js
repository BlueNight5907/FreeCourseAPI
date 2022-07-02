import { StatusCodes as httpStatus } from "http-status-codes";
import { APIError } from "../common/APIError";
import Category from "../model/category";
import Course from "../model/course";
import * as authMethod from "../modules/auth/auth.method";

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

export const notJoined = async (req, res, next) => {
  const errorResponse = new APIError(
    "Đã tham gia vào khóa học này!!",
    httpStatus.CONFLICT,
    true
  );
  const { user, course } = req;
  if (course.participants.indexOf(user._id) !== -1) {
    return next(errorResponse);
  }
  return next();
};

export const isJoined = async (req, res, next) => {
  const errorResponse = new APIError(
    "Chưa tham gia vào khóa học này!!",
    httpStatus.CONFLICT,
    true
  );
  const { user, course } = req;
  if (course.participants.indexOf(user._id) === -1) {
    return next(errorResponse);
  }
  return next();
};

export const canModifiedCourse = async (req, res, next) => {
  const { course, user } = req;
  const errorResponse = new APIError(
    "Bạn không có quyền chỉnh sửa khóa học này!!",
    httpStatus.FORBIDDEN,
    true
  );
  if ((await authMethod.checkAdmin(user)) || course.creator.equals(user._id)) {
    return next();
  }
  return next(errorResponse);
};

export const notCreator = async (req, res, next) => {
  const { user, course } = req;
  const errorResponse = new APIError(
    "Bạn không thể tham gia vào khóa học của chính mình!!",
    httpStatus.FORBIDDEN,
    true
  );
  if (course.creator.equals(user._id)) {
    return next(errorResponse);
  }
  return next();
};

export const existComment = async (req, res, next) => {
  const errorResponse = new APIError(
    "Không tìm thấy bình luận này!!!",
    httpStatus.BAD_REQUEST,
    true
  );
  const { commentId } = req.params;
  const { course } = req;
  try {
    const comments = course.comments;
    const commentIndex = comments.findIndex((comment) =>
      comment._id.equals(commentId)
    );
    if (commentIndex < 0) {
      throw errorResponse;
    }
    req.comment = comments[commentIndex];
    req.commentIndex = commentIndex;
    return next();
  } catch (error) {
    return next(errorResponse);
  }
};

export const existCategory = async (req, res, next) => {
  const errorResponse = new APIError(
    "Không tìm danh mục này!!!",
    httpStatus.BAD_REQUEST,
    true
  );
  const { categoryPath } = req.params;
  if (categoryPath === "all") {
    return next();
  }
  try {
    const category = await Category.findOne({ urlPath: categoryPath });
    req.category = category;
    return next();
  } catch (error) {
    return next(errorResponse);
  }
};
