import { check, query } from "express-validator";
import { paginateValidator } from "../../../common/common.validator";
export const courseValidator = [
  check("title").notEmpty().withMessage("Tiêu đề không được để trống"),
  check("content").notEmpty().withMessage("Nội dung không được để trống"),
  check("level").notEmpty().withMessage("Level không được để trống"),
  check("background").isURL().withMessage("Ảnh nền không hợp lệ"),
  check("gains").isArray().withMessage("Kết quả đạt được không hợp lệ"),
];

export const courseSearchValidator = [
  query("tags").optional(),
  query("rates").optional(),
  ...paginateValidator,
];
