import jwt from "jsonwebtoken";
import util from "util";
import { accountTypes } from "../../constants/account-constant";
import Account from "../../model/account";
const promisify = util.promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

export const generateToken = async (payload, secretSignature, tokenLife) => {
  try {
    return await sign(
      {
        payload,
      },
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      }
    );
  } catch (error) {
    console.log(`Error in generate access token:  + ${error}`);
    return null;
  }
};

export const verifyToken = async (token, secretKey) => {
  try {
    return await verify(token, secretKey);
  } catch (error) {
    console.log(`Error in verify access token:  + ${error}`);
    return null;
  }
};

export const decodeToken = async (token, secretKey) => {
  try {
    return await verify(token, secretKey, {
      ignoreExpiration: true,
    });
  } catch (error) {
    console.log(`Error in decode access token: ${error}`);
    return null;
  }
};

export const checkAdmin = async (user) => {
  await user.populate("type");
  if (user.type?.name === accountTypes.admin) {
    return true;
  }
  return false;
};

export const existUser = async (userId) => {
  try {
    const account = await Account.findById(userId);
    if (!account) {
      return null;
    }
    return account;
  } catch (error) {
    return null;
  }
};
