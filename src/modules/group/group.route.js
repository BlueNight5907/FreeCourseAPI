import express from "express";
import handleValidationResult from "../../common/handleValidationResult";
import * as groupController from "./group.controller";
import { groupValidator } from "./validators/group.validator";
import {
  canModifiedGroup,
  existGroup,
  isInGroup,
  isInvited,
  notInGroup,
} from "../../middlewares/group.middleware";
import { existAccount } from "../../middlewares/auth.middleware";
const router = express.Router();
/*
 * ---------------------------
 * Group of group route
 */

router.get("/all-groups", groupController.allGroup);
router.post(
  "/create",
  groupValidator,
  handleValidationResult,
  groupController.createGroup
);
router.get("/my-groups", groupController.myGroup);
router.get("/:groupId", existGroup, groupController.getGroup);
router.put(
  "/:groupId",
  existGroup,
  canModifiedGroup,
  groupValidator,
  handleValidationResult,
  groupController.updateGroup
);
router.delete(
  "/:groupId",
  existGroup,
  canModifiedGroup,
  groupController.deleteGroup
);
router.post(
  "/:groupId/invite",
  existGroup,
  canModifiedGroup,
  groupController.inviteUser
);
router.post(
  "/:groupId/accept-invite",
  existGroup,
  notInGroup,
  isInvited,
  groupController.acceptInvite
);
router.post(
  "/:groupId/leave",
  existGroup,
  isInGroup,
  groupController.leaveGroup
);
router.post(
  "/:groupId/kick/:userId",
  existGroup,
  canModifiedGroup,
  existAccount,
  groupController.kickUser
);
router.get(
  "/:groupId/message",
  existGroup,
  isInGroup,
  groupController.getMessage
);

const groupRoutes = router;
export default groupRoutes;
