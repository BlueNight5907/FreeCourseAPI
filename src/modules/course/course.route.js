import express from "express";
import handleValidationResult from "../../common/handleValidationResult.js";
import {
  canModifiedCourse,
  existCourse,
  isJoined,
  isNotJoined,
  notCreator,
} from "../../middlewares/course.middleware.js";
import * as controller from "./course.controller.js";
import { courseValidator } from "./validator/course.validator.js";

const router = express.Router();

router.get("/me", controller.myCourses);
router.get("/created-by-me", controller.myCreatedCourses);
router.get(
  "/:courseId/learning-process",
  existCourse,
  isNotJoined,
  controller.learningProcess
);
router.post(
  "/create",
  courseValidator,
  handleValidationResult,
  controller.createCourse
);
router.get("/detail/:courseId", existCourse, controller.getInfoCourse);
router.get("/all", controller.getInfoAllCourse);
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
router.post(
  "/join/:courseId",
  existCourse,
  notCreator,
  isJoined,
  controller.joinCourse
);
router.post(
  "/unjoin/:courseId",
  existCourse,
  isNotJoined,
  controller.unJoinCourse
);
router.get("/people/:courseId", existCourse, controller.studentInCourse);

const courseRoutes = router;
export default courseRoutes;
