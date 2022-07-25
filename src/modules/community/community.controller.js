import Account from "../../model/account";
import Post from "../../model/post";
import { getDataFromAllSettled, uniqBy } from "../../utils/array-utils";
import { allComments } from "./community.method";

export const getAllFeeds = async (req, res, next) => {
  const feeds = await Post.find({}).sort("-createdAt");
  return res.json({ data: feeds, total: feeds.length });
};

export const getNewFeeds = async (req, res, next) => {
  let { time, page_size, page, userId } = req.query;
  const query = {};
  console.log("call:", page);
  try {
    time = new Date(time).toISOString();
  } catch (error) {
    time = new Date().toISOString();
  }
  const feeds = await Post.find(query)
    .where("createdAt")
    .lte(time)
    .sort("-createdAt")
    .skip(page * page_size - page_size)
    .limit(page_size || 10)
    .exec((error, doc) => {
      if (error) {
        return res.json(error);
      }
      Post.countDocuments(query).exec((error_count, count) => {
        if (error_count) return res.json(error);
        return res.json({
          totalSize: count,
          size: doc.length,
          feeds: doc,
        });
      });
    });
  // const size = Post.totalSize();
  // const data = { feeds, size };
  // return res.json(data);
};

export const getPost = async (req, res, next) => {
  const { post } = req;
  const creator = await Account.findById(post.creator);
  const result = post._doc;
  result.creator = {
    _id: result.creator,
    userInformation: creator.userInformation,
  };
  return res.json(result);
};

export const addPost = async (req, res, next) => {
  const { user } = req;
  const { title, description, content, url, backgroundUrl } = req.body;
  const post = new Post({
    creator: user._id,
    title,
    description,
    content,
    url,
    backgroundUrl,
  });
  post.url += post._id;
  await post.save();
  return res.json({ post });
};

export const updatePost = async (req, res, next) => {
  const { post } = req;
  const { title, description, content, url, backgroundUrl } = req.body;
  post.title = title;
  post.description = description;
  post.content = content;
  post.url = url;
  post.backgroundUrl = backgroundUrl;
  await post.save();
  return res.json({ post });
};

export const deletePost = async (req, res, next) => {
  const { postId } = req.params;
  await Post.findByIdAndDelete(postId);
  return res.json({ message: "Xoá bài viết thành công" });
};

export const likePost = async (req, res, next) => {
  const { user, post } = req;
  const isLiked = post.likes.filter((u) => u.equals(user._id)).length > 0;
  if (isLiked) {
    post.likes = post.likes.filter((u) => !u.equals(user._id));
  } else {
    post.likes.push(user._id);
  }
  await post.save();
  return res.json({ status: !isLiked });
};

export const getAllComment = async (req, res, next) => {
  const { post } = req;
  const comments = await allComments(post);
  res.json(getDataFromAllSettled(comments));
};

export const addComment = async (req, res, next) => {
  const { user, post } = req;
  const { content, url } = req.body;
  post.comments.push({ accountId: user._id, content, url });
  await post.save();
  const comment = post.comments.at(-1)._doc;
  comment.userInformation = (
    await Account.findById(comment.accountId)
  ).userInformation;
  return res.json(comment);
};

export const updateComment = async (req, res, next) => {
  let { post, comment, commentIndex } = req;
  const { content, url } = req.body;
  comment.content = content;
  comment.url = url;
  post.comments[commentIndex] = comment;
  await post.save();
  comment = comment._doc;
  comment.userInformation = (
    await Account.findById(comment.accountId)
  ).userInformation;
  return res.json(comment);
};

export const deleteComment = async (req, res, next) => {
  const { post, commentIndex } = req;
  post.comments.splice(commentIndex, 1);
  await post.save();
  const comments = await allComments(post);
  return res.json(getDataFromAllSettled(comments));
};

export const likeComment = async (req, res, next) => {
  let { user, post, comment } = req;
  const isLiked = comment.likes.filter((u) => u.equals(user._id)).length > 0;
  if (isLiked) {
    comment.likes = comment.likes.filter((u) => !u.equals(user._id));
  } else {
    comment.likes.push(user._id);
  }
  await post.save();
  return res.json({ status: !isLiked });
};
