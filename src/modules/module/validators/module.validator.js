import { check } from "express-validator";
import { typeofArray } from "../../../utils/check-type";

export const moduleValidate = [
  check("title")
    .exists()
    .withMessage("Tên chương không được để trống")
    .notEmpty()
    .withMessage("Tên chương không được để trống"),
];

export const editModuleValidate = [
  check("title")
    .exists()
    .withMessage("Tên chương không được để trống")
    .notEmpty()
    .withMessage("Tên chương không được để trống"),
  check("steps").custom((value, { req }) => {
    if (!value) return true;
    if (!typeofArray(value)) throw new Error("Steps phải là một mảng!!!");
    value.forEach((item) => {
      if (!item.title || !item.content || item.type) {
        throw new Error("Không đúng định dạng step!!!");
      }
    });
    return true;
  }),
];
