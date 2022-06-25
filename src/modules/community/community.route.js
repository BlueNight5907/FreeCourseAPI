import express from "express";
import { commentValidator } from "../../common/comment.validator";
import handleValidationResult from "../../common/handleValidationResult";
import {
  canModifiedPost,
  existPost,
  existComment,
} from "../../middlewares/community.middleware";
import * as communityController from "./community.controller";
import { postValidator } from "./validators/post.validator";

const router = express.Router();

router.get("/feeds", communityController.getNewFeeds);

router.get("/post/:postId", existPost, communityController.getPost);
router.post(
  "/post",
  postValidator,
  handleValidationResult,
  communityController.addPost
);
router.put(
  "/post/:postId",
  existPost,
  canModifiedPost,
  postValidator,
  handleValidationResult,
  communityController.updatePost
);
router.delete(
  "/post/:postId",
  existPost,
  canModifiedPost,
  communityController.deletePost
);
router.post("/post/:postId/like", existPost, communityController.likePost);

router.get(
  "/post/:postId/comments",
  existPost,
  communityController.getAllComment
);
router.post(
  "/post/:postId/comment",
  existPost,
  commentValidator,
  handleValidationResult,
  communityController.addComment
);
router.put(
  "/post/:postId/comment/:commentId",
  existPost,
  existComment,
  commentValidator,
  handleValidationResult,
  communityController.updateComment
);
router.delete(
  "/post/:postId/comment/:commentId",
  existPost,
  existComment,
  communityController.deleteComment
);
router.post(
  "/post/:postId/comment/:commentId/like",
  existPost,
  existComment,
  communityController.likeComment
);

const communityRoutes = router;
export default communityRoutes;
