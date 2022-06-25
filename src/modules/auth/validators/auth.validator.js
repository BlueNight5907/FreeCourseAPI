import { check } from "express-validator";

export const updatePasswordValidator = [
  check("oldPassword").notEmpty().withMessage("Mật khẩu không được để trống"),
  check("newPassword")
    .notEmpty()
    .withMessage("Mật khẩu mới không được để trống")
    .isLength({ min: 8 })
    .withMessage("Mật khẩu quá ngắn"),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error("Mật khẩu không khớp");
    }
    return true;
  }),
];

export const loginValidator = [
  check("email").notEmpty().withMessage("Email không được để trống"),
  check("password")
    .notEmpty()
    .withMessage("Mật khẩu không được để trống")
    .isLength({ min: 8 })
    .withMessage("Mật khẩu quá ngắn"),
];

export const userValidator = [
  check("email").notEmpty().withMessage("Email không được để trống"),
  check("password").notEmpty().withMessage("Mật khẩu không được để trống"),
  check("fullName").notEmpty().withMessage("Tên hiển thị không được để trống"),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Mật khẩu không khớp");
    }
    return true;
  }),
];
