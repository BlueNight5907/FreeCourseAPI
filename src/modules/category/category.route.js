import express from "express";
import * as controller from "./category.controller.js";

const router = express.Router();

router.get("/all", controller.getAllCategory);
router.post("/create", controller.postCategory);
router.get("/:id", controller.getCategorybyId);
router.put("/update/:id", controller.editCategory);
router.delete("/delete/:id", controller.deleteCategory);

const categoryRoutes = router;
export default categoryRoutes;