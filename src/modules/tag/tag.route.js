import express from "express";
import * as controller from "./tag.controller.js";
import { isAdmin } from "../../middlewares/auth.middleware";

const router = express.Router();

router.get("/all", controller.getAllTag);
router.post("/create", isAdmin, controller.postTag);
router.get("/:id", controller.getTagbyId);
router.delete("/delete/:id", isAdmin, controller.deleteTag);
router.put("/update/:id", isAdmin, controller.editTag);

const tagRoutes = router;
export default tagRoutes;
