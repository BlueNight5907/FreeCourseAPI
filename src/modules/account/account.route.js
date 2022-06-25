import express from "express";
import { isAdmin, isAuth } from "../../middlewares/auth.middleware";
//import { route } from "express";
import * as accountController from "./account.controller";

const router = express.Router();

router.put("/edit", isAuth, accountController.putEditAccount);
router.get("/all", accountController.getAllAccount);
router.get("/me", isAuth, accountController.getMyAccount);
router.delete("/:id", accountController.deleteAccount);
router.put("/:id", accountController.editAccountAdmin);
router.get("/:id", accountController.getInfoUser);

const accountRoutes = router;
export default accountRoutes;
