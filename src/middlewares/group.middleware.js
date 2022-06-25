import { StatusCodes as httpStatus } from "http-status-codes";
import { APIError } from "../common/APIError";
import GroupChat from "../model/group-chat";
import * as authMethod from "../modules/auth/auth.method";

export const existGroup = async (req, res, next) => {
  const errorResponse = new APIError(
    "Không tìm thấy nhóm này!!!",
    httpStatus.BAD_REQUEST,
    true
  );
  const { groupId } = req.params;
  try {
    const group = await GroupChat.findById(groupId);
    if (!group) {
      throw errorResponse;
    }
    req.group = group;
    return next();
  } catch (error) {
    return next(errorResponse);
  }
};

export const canModifiedGroup = async (req, res, next) => {
  const { group, user } = req;
  const errorResponse = new APIError(
    "Bạn không có quyền chỉnh sửa nhóm này!!",
    httpStatus.FORBIDDEN,
    true
  );
  if ((await authMethod.checkAdmin(user)) || group.hostId.equals(user._id)) {
    return next();
  }
  return next(errorResponse);
};

export const notInGroup = async (req, res, next) => {
  const { group, user } = req;
  const errorResponse = new APIError(
    "Bạn đã được thêm vào nhóm này rồi!!",
    httpStatus.FORBIDDEN,
    true
  );
  if (user.groups?.includes(group._id.toString())) {
    return next(errorResponse);
  }
  return next();
};

export const isInvited = async (req, res, next) => {
  const { group, user } = req;
  const errorResponse = new APIError(
    "Bạn không được mời vào nhóm này!!",
    httpStatus.FORBIDDEN,
    true
  );
  if (!user.invites?.includes(group._id.toString())) {
    return next(errorResponse);
  }
  return next();
};

export const isInGroup = async (req, res, next) => {
  const { group, user } = req;
  const errorResponse = new APIError(
    "Bạn chưa được thêm vào nhóm này rồi!!",
    httpStatus.FORBIDDEN,
    true
  );
  if (!user.groups?.includes(group._id.toString())) {
    return next(errorResponse);
  }
  return next();
};
