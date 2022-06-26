import { accountTypes } from "../constants/account-constant.js";
import { jwtVariable } from "../constants/jwt.js";
import AccountModel from "../model/account.js";
import * as authMethod from "../modules/auth/auth.method";
import { StatusCodes as httpStatus } from "http-status-codes";
import { APIError } from "../common/APIError.js";
import Account from "../model/account.js";

export const isAuth = async (req, res, next) => {
  const accessTokenFromHeader = req.headers["authorization"];
  if (!accessTokenFromHeader) {
    return res.status(401).send("Không tìm thấy access token!");
  }
  const token = accessTokenFromHeader.split(" ")[1];
  const accessTokenSecret = jwtVariable.accessTokenSecret;
  const verified = await authMethod.verifyToken(token, accessTokenSecret);
  if (!verified) {
    return res
      .status(401)
      .send("Bạn không có quyền truy cập vào tính năng này - User!");
  }

  const user = await AccountModel.findOne({
    email: verified.payload.email,
  });
  if (!user) {
    return res.status(401).send("Bạn đã logout");
  }
  req.email = verified.payload.email;
  req.user = user;

  return next();
};

export const isAdmin = async (req, res, next) => {
  const { user } = req;
  if (await authMethod.checkAdmin(user)) {
    return next();
  }
  const errorResponse = new APIError(
    "Bạn không có quyền truy cập vào chức năng này!!!",
    httpStatus.FORBIDDEN,
    true
  );
  return next(errorResponse);
};

export const existAccount = async (req, res, next) => {
  const { userId } = req.params;
  const errorResponse = new APIError(
    "Người dùng này không tồn tại!!!",
    httpStatus.FORBIDDEN,
    true
  );
  const account = await authMethod.existUser(userId);
  if (account) {
    req.account = account;
    return next();
  }
  next(errorResponse);
};
