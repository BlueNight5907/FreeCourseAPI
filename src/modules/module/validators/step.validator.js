import { check } from "express-validator";
import { stepType } from "../../../constants/model-constant";

export const lessonValidate = [
  check("title").notEmpty().withMessage("Tiêu đề không được để trống"),
  check("stepType")
    .isIn(Object.values(stepType))
    .withMessage("Loại bài học không hợp lệ"),
  check("time").isNumeric().withMessage("Thời gian học không hợp lệ"),
  check("type")
    .isIn(["youtube", "video", "document", "default"])
    .withMessage("Tài nguyên cho bài học không hợp lệ"),
  check("content")
    .notEmpty()
    .withMessage("Nội dung khóa học không được để trống"),
  check("url").custom((value, { req }) => {
    if (req.type === "default") {
      return true;
    }

    if (!value) {
      throw new Error("Url không được để trống");
    }

    return true;
  }),
];
