import { check } from "express-validator";
export const commentValidator = [
  check("content")
    .notEmpty()
    .withMessage("Nội dung bình luận không được để trống"),
  // check("url").optional().isURL().withMessage("URL không hợp lệ"),
];
