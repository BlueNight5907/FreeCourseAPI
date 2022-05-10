import express from "express";
import * as controller from "../controllers/tag.controller.js";

const router = express.Router();

router.get("/all", controller.getAllTag);
router.post("/create", controller.postTag);
router.get("/:id", controller.getTagbyId);
router.put("/update/:id", controller.editTag);
router.delete("/delete/:id", controller.deleteTag);

export default router;