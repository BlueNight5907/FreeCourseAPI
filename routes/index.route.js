import express from "express";
import * as controller from "../controllers/index.controller.js";
import * as controllerAccount from "../controllers/account.controller.js";

const router = express.Router();

router.get("/", controller.index);
router.get("/signup", controllerAccount.getSignup);
router.post("/signup", controllerAccount.postSignup);
router.get("/signin", controllerAccount.getSignin);
router.post("/signin", controllerAccount.postSingin);

export default router;