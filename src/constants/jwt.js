import config from "../config";

export const jwtVariable = {
  accessTokenSecret: config.tokenSecret,
  accessTokenLife: config.tokenLife,
  refreshTokenSize: config.refreshTokenSize,
  bearerLength: 7,
};
