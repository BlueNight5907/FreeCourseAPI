import express from "express";
import * as controller from "./course.controller.js";

const router = express.Router();

router.post("/create", controller.createCourse);
router.get("/detail/:id", controller.getInfoCourse);
router.get("/all", controller.getInfoAllCourse);
router.put("/edit/:id", controller.editCourse);
router.delete("/delete/:id", controller.deleteCourse);
router.post("/join/:id", controller.joinCourse);
router.post("/unjoin/:id", controller.unJoinCourse);
router.get("/people/:id", controller.studentInCourse);

const courseRoutes = router;
export default courseRoutes;
