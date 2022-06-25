import express from "express";
import handleValidationResult from "../../common/handleValidationResult";
import { isAdmin, isAuth } from "../../middlewares/auth.middleware";
import { userValidator } from "../auth/validators/auth.validator";
//import { route } from "express";
import * as accountController from "./account.controller";

const router = express.Router();

router.put(
  "/edit",
  isAuth,
  userValidator,
  handleValidationResult,
  accountController.putEditAccount
);
router.get("/all", accountController.getAllAccount);
router.get("/me", isAuth, accountController.getMyAccount);
router.delete("/:id", accountController.deleteAccount);
router.put("/:id", accountController.editAccountAdmin);
router.get("/:id", accountController.getInfoUser);

const accountRoutes = router;
export default accountRoutes;
