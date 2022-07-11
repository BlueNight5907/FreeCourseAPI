import express from "express";
import { commentValidator } from "../../common/comment.validator.js";
import { paginateValidator } from "../../common/common.validator.js";
import handleValidationResult from "../../common/handleValidationResult.js";
import {
  canModifiedCourse,
  existComment,
  existCourse,
  notJoined,
  isJoined,
  notCreator,
  existCategory,
} from "../../middlewares/course.middleware.js";
import * as controller from "./course.controller.js";
import { courseValidator } from "./validator/course.validator.js";

const router = express.Router();

router.get("/levels", controller.getLevels);
router.get("/me", controller.myCourses);
router.get("/created-by-me", controller.myCreatedCourses);
router.get(
  "/:courseId/learning-process",
  existCourse,
  isJoined,
  controller.learningProcess
);

router.get("/:courseId/all-comment", existCourse, controller.getAllComment);

router.post(
  "/:courseId/comment",
  existCourse,
  commentValidator,
  handleValidationResult,
  controller.addComment
);

router.post(
  "/:courseId/rating",
  existCourse,
  isJoined,
  controller.ratingCourse
);

router.delete(
  "/:courseId/comment/:commentId",
  existCourse,
  existComment,
  controller.deleteComment
);

router.post(
  "/create",
  courseValidator,
  handleValidationResult,
  controller.createCourse
);
router.get("/category/:categoryPath", existCategory, controller.getCourses);
router.get("/detail/:courseId", existCourse, controller.getInfoCourse);
router.get("/all", paginateValidator, controller.getInfoAllCourse);
router.put(
  "/:courseId",
  existCourse,
  canModifiedCourse,
  courseValidator,
  handleValidationResult,
  controller.editCourse
);
router.delete(
  "/:courseId",
  existCourse,
  canModifiedCourse,
  controller.deleteCourse
);
router.get("/:courseId", existCourse, controller.getCourse);

router.post(
  "/join/:courseId",
  existCourse,
  notCreator,
  notJoined,
  controller.joinCourse
);
router.post(
  "/unjoin/:courseId",
  existCourse,
  isJoined,
  controller.unJoinCourse
);
router.get("/people/:courseId", existCourse, controller.studentInCourse);

const courseRoutes = router;
export default courseRoutes;
