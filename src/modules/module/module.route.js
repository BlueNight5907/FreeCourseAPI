import express from "express";
import handleValidationResult from "../../common/handleValidationResult";
import { existCourse } from "../../middlewares/course.middleware";
import { existModule } from "../../middlewares/module.middleware";
import * as moduleController from "./module.controller";
import {
  editModuleValidate,
  moduleValidate,
} from "./validators/module.validator";
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
  moduleController.getStepDetail
);

// POST create new step
router.post("/:moduleId/step", existModule, moduleController.createNewStep);

// PUT edit a step
router.put("/:moduleId/step/:stepId", existModule, moduleController.editStep);

// DELETE remove a step
router.delete(
  "/:moduleId/step/:stepId",
  existModule,
  moduleController.deleteStep
);

// GET get all answer
router.get(
  "/:moduleId/step/:stepId/get-all-answer",
  existModule,
  moduleController.getTestAnswer
);

// POST submit test
router.post(
  "/:moduleId/step/:stepId/submit-test",
  existModule,
  moduleController.submitTest
);

// POST complete the lesson
router.post(
  "/:moduleId/step/:stepId/complete",
  existModule,
  moduleController.completeLesson
);

// GET get all step comments
router.get(
  "/:moduleId/step/:stepId/comment",
  existModule,
  moduleController.getAllComment
);

// POST create new comment in step
router.post(
  "/:moduleId/step/:stepId/comment",
  existModule,
  moduleController.addComment
);

// POST delete a comment in step
router.delete(
  "/:moduleId/step/:stepId/comment",
  existModule,
  moduleController.deleteComment
);

const moduleRoutes = router;
export default moduleRoutes;
