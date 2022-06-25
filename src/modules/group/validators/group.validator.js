import { check } from "express-validator";
export const groupValidator = [
  check("background").optional().isURL().withMessage("URL không hợp lệ"),
  check("name").notEmpty().withMessage("Tên nhóm không được để trống"),
];

export const inviteValidator = [
  check("users")
    .isArray({ min: 1 })
    .withMessage("Số người dùng thêm vào không được để trống"),
];
