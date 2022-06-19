import { validationResult } from "express-validator";
import { APIError } from "./APIError";
import { StatusCodes as httpStatus } from "http-status-codes";

export default function handleValidationResult(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorResponse = new APIError(
      errors.array()[0].msg,
      httpStatus.BAD_REQUEST,
      true
    );
    return next(errorResponse);
  }
  return next();
}
