import { check } from "express-validator";
export const postValidator = [
  check("content")
    .optional()
    .notEmpty()
    .withMessage("Nội dung bài viết không được để trống"),
  check("url").optional().isURL().withMessage("URL không hợp lệ"),
];
