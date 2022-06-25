import express from "express";
import { commentValidator } from "../../common/comment.validator";
import handleValidationResult from "../../common/handleValidationResult";
import { existCourse, isJoined } from "../../middlewares/course.middleware";
import {
  existLearningProcess,
  existModule,
  existStep,
} from "../../middlewares/module.middleware";
import * as moduleController from "./module.controller";
import {
  editModuleValidate,
  moduleValidate,
} from "./validators/module.validator";
import { lessonValidate } from "./validators/step.validator";
const router = express.Router();
/*
 * ---------------------------
 * Group of module route
 */

// GET get all modules
router.get("/all/:courseId", existCourse, moduleController.getAllModules);

// GET module/detail/:id
router.get("/:moduleId", existModule, moduleController.getDetail);

// POST add new module
router.post(
  "/:courseId",
  existCourse,
  moduleValidate,
  handleValidationResult,
  moduleController.addNewModule
);

// PUT edit module
router.put(
  "/:moduleId",
  existModule,
  editModuleValidate,
  handleValidationResult,
  moduleController.editModule
);

// DELETE remove module
router.delete(
  "/:courseId/:moduleId",
  existCourse,
  existModule,
  moduleController.deleteModule
);

/*
 * ---------------------------
 * Group of step route
 */
// GET get detail of a step
router.get(
  "/:moduleId/step/:stepId",
  existModule,
  existStep,
  moduleController.getStepDetail
);

// POST create new step - lesson
router.post(
  "/:moduleId/step/lesson",
  existModule,
  lessonValidate,
  handleValidationResult,
  moduleController.createLesson
);

// POST create new step - test
router.post(
  "/:moduleId/step/test",
  existModule,
  lessonValidate,
  handleValidationResult,
  moduleController.createLesson
);

// PUT edit a step - lesson
router.put(
  "/:moduleId/step/:stepId/lesson",
  existModule,
  existStep,
  lessonValidate,
  handleValidationResult,
  moduleController.editStep
);

// PUT edit a step - test
router.put(
  "/:moduleId/step/:stepId/test",
  existModule,
  existStep,
  lessonValidate,
  handleValidationResult,
  moduleController.editStep
);

// DELETE remove a step
router.delete(
  "/:moduleId/step/:stepId",
  existModule,
  existStep,
  moduleController.deleteStep
);

// GET get all answer
router.get(
  "/:moduleId/step/:stepId/get-all-answer",
  existModule,
  existStep,
  moduleController.getTestAnswer
);

// POST submit test
router.post(
  "/:moduleId/step/:stepId/submit-test",
  existModule,
  existStep,
  moduleController.submitTest
);

// POST complete the lesson
router.post(
  "/:moduleId/step/:stepId/complete",
  existModule,
  existStep,
  existLearningProcess,
  moduleController.completeLesson
);

// GET get all step comments
router.get(
  "/:moduleId/step/:stepId/comment",
  existModule,
  existStep,
  moduleController.getAllComment
);

// POST create new comment in step
router.post(
  "/:moduleId/step/:stepId/comment",
  existModule,
  existStep,
  commentValidator,
  handleValidationResult,
  moduleController.addComment
);

// POST delete a comment in step
router.delete(
  "/:moduleId/step/:stepId/comment/:commentId",
  existModule,
  existStep,
  moduleController.deleteComment
);

const moduleRoutes = router;
export default moduleRoutes;
