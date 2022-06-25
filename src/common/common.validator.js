import { query } from "express-validator";

export const paginateValidator = [
  query("sort").optional(),
  query("page").notEmpty().withMessage("Request không hợp lệ"),
  query("page_size").notEmpty().withMessage("Request không hợp lệ"),
  query("order").optional(),
];
