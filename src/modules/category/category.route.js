import express from "express";
import { isAdmin } from "../../middlewares/auth.middleware.js";
import * as controller from "./category.controller.js";

const router = express.Router();

router.get("/all", controller.getAllCategory);
router.post("/create", isAdmin, controller.postCategory);
router.get("/:id", controller.getCategorybyId);
router.put("/update/:id", isAdmin, controller.editCategory);
router.delete("/delete/:id", isAdmin, controller.deleteCategory);

const categoryRoutes = router;
export default categoryRoutes;
