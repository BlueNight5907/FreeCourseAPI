import express from "express";
import * as communityController from "./community.controller";

const router = express.Router();

router.get("/feeds", communityController.getNewFeeds);

router.get("/post/:postId", communityController.getPost);
router.post("/post", communityController.addPost);
router.put("/post/:postId", communityController.updatePost);
router.delete("/post/:postId", communityController.deletePost);
router.post("/post/:postId/like", communityController.likePost);

router.get("/post/:postId/comments", communityController.getAllComment);
router.post("/post/:postId/comment", communityController.addComment);
router.put(
  "/post/:postId/comment/:commentId",
  communityController.updateComment
);
router.delete(
  "/post/:postId/comment/:commentId",
  communityController.deleteComment
);
router.post(
  "/post/:postId/comment/:commentId/like",
  communityController.likeComment
);

const communityRoutes = router;
export default communityRoutes;
