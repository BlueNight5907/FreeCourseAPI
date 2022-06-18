import express from "express";
import * as authController from "./auth.controller.js";

const router = express.Router();

router.post("/signup", authController.postSignup);
router.post("/signin", authController.postSingin);
router.put("/updatePassword", authController.putUpdatePassword);
router.post("/refreshtoken", authController.refreshToken);
router.post("/active", authController.activeAccount);

const authRoutes = router;
export default authRoutes;
