import { StatusCodes as httpStatus } from "http-status-codes";
import { APIError } from "../common/APIError";
import Post from "../model/post";
import * as authMethod from "../modules/auth/auth.method";

export const canModifiedPost = async (req, res, next) => {
  const { post, user } = req;
  const errorResponse = new APIError(
    "Bạn không có quyền chỉnh sửa bài viết này!!",
    httpStatus.FORBIDDEN,
    true
  );
  if ((await authMethod.checkAdmin(user)) || post.creator.equals(user._id)) {
    return next();
  }
  return next(errorResponse);
};

export const existPost = async (req, res, next) => {
  const errorResponse = new APIError(
    "Không tìm thấy bài viết này!!!",
    httpStatus.BAD_REQUEST,
    true
  );
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw errorResponse;
    }
    req.post = post;
    return next();
  } catch (error) {
    return next(errorResponse);
  }
};

export const existComment = async (req, res, next) => {
  const errorResponse = new APIError(
    "Không tìm thấy bình luận này!!!",
    httpStatus.BAD_REQUEST,
    true
  );
  const { post } = req;
  const { commentId } = req.params;
  try {
    const commentIndex = post.comments.findIndex((comment) =>
      comment._id.equals(commentId)
    );
    if (commentIndex < 0) {
      throw errorResponse;
    }
    req.comment = post.comments[commentIndex];
    req.commentIndex = commentIndex;
    return next();
  } catch (error) {
    return next(errorResponse);
  }
};
