import express from "express";
import handleValidationResult from "../../common/handleValidationResult.js";
import * as authController from "./auth.controller.js";
import {
  loginValidator,
  updatePasswordValidator,
  userValidator,
} from "./validators/auth.validator.js";

const router = express.Router();

router.post(
  "/signup",
  userValidator,
  handleValidationResult,
  authController.postSignup
);
router.post(
  "/signin",
  loginValidator,
  handleValidationResult,
  authController.postSingin
);
router.put(
  "/updatePassword",
  updatePasswordValidator,
  handleValidationResult,
  authController.putUpdatePassword
);
router.post("/refreshtoken", authController.refreshToken);
router.post("/active", authController.activeAccount);

const authRoutes = router;
export default authRoutes;
