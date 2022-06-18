import express from "express";
//import { route } from "express";
import * as accountController from "./account.controller";

const router = express.Router();

router.put("/edit", accountController.putEditAccount);
router.get("/all", accountController.getAllAccount);
router.delete("/:id", accountController.deleteAccount);
router.put("/:id", accountController.editAccountAdmin);
router.get("/:id", accountController.getInfoUser);

const accountRoutes = router;
export default accountRoutes;
