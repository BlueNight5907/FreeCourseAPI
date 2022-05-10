import express from "express";
//import { route } from "express";
import * as controller from "../controllers/account.controller.js";

const router = express.Router();

router.put("/edit", controller.putEditAccount);
router.put("/updatePassword", controller.putUpdatePassword)
router.get("/all", controller.getAllAccount);
router.delete("/:id",controller.deleteAccount);
router.put("/:id", controller.editAccountAdmin);
router.get("/:id", controller.getInfoUser);
router.post("/refreshtoken", controller.refreshToken);
router.post("/active", controller.activeAccount);

export default router;