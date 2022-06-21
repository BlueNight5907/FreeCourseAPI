import courseModel from "../../model/course.js";
import accountModel from "../../model/account.js";
import Course, { Level } from "../../model/course.js";
import LearningProcess from "../../model/learning-process";
import { deleteSecureField } from "../../utils/mongoose-ultis.js";
import Account from "../../model/account.js";
import { getDataFromAllSettled } from "../../utils/array-utils.js";
import { allComment, getLearningProcess } from "./course.method.js";

export const createCourse = async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const shortDesc = req.body.shortDesc;
  const background = req.body.background;
  const password = req.body.password;
  const level = req.body.level;
  const category = req.body.category;
  const tags = req.body.tags;
  const gains = req.body.gains;

  const _IdAccount = req.user._id;

  const course = new courseModel({
    title,
    content,
    shortDesc,
    background,
    password,
    creator: _IdAccount,
    tags,
    category,
    level,
    gains,
  });
  course.save((err) => {
    if (err) {
      next(err);
    } else {
      res.json(course);
    }
  });
};

export const getInfoCourse = async (req, res) => {
  const { course } = req;
  await course.populate("level");
  await course.populate("category");
  const infoCourse = new Object({
    title: course.title,
    content: course.content,
    shortDesc: course.shortDesc,
    background: course.background,
    ...course._doc,
  });
  res.send(infoCourse);
};

export const getInfoAllCourse = async (req, res) => {
  const course = await courseModel.find().populate(["level", "category"]);
  res.send(course);
};

export const editCourse = async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const shortDesc = req.body.shortDesc;
  const background = req.body.background;
  const password = req.body.password;
  const level = req.body.level;
  const category = req.body.category;
  const tags = req.body.tags;
  const gains = req.body.gains;

  const { course } = req;

  course.title = title;
  course.content = content;
  course.shortDesc = shortDesc;
  course.background = background;
  course.password = password;
  course.level = level;
  course.category = category;
  course.tags = tags;
  course.gains = gains;

  course.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Update Course Successfully");
    }
  });
};

export const deleteCourse = async (req, res) => {
  const _id = req.params.courseId;
  await courseModel.findByIdAndRemove(_id);
  await LearningProcess.deleteMany({ courseId: course._id });
  res.send("Xóa khóa học thành công");
};

export const joinCourse = async (req, res, next) => {
  const { course, user } = req;
  const _IdAccount = user._id;
  course.participants.push(_IdAccount);
  const learningProcess = new LearningProcess({
    accountId: user._id,
    courseId: course._id,
    visited: new Date().getTime(),
  });
  try {
    await learningProcess.save();
    await course.save();
    res.send("Tham gia khóa học thành công");
  } catch (error) {
    next(error);
  }
};

export const unJoinCourse = async (req, res, next) => {
  const { course, user } = req;
  const _IdAccount = user._id;
  const indexUser = course.participants.indexOf(_IdAccount);
  course.participants.splice(indexUser, 1);
  try {
    await LearningProcess.findOneAndDelete({
      accountId: user._id,
      courseId: course._id,
    });
    await course.save();
    res.send("Huỷ tham gia khóa học thành công");
  } catch (error) {
    next(error);
  }
};

export const studentInCourse = async (req, res) => {
  const { course } = req;
  const studentList = course.participants;
  const stuList = [];
  for (let element of studentList) {
    const user = await accountModel.findById(element);
    const stu = new Object({
      _id: user._id,
      userInformation: user.userInformation,
    });
    stuList.push(stu);
  }
  res.send(stuList);
};

export const myCourses = async (req, res) => {
  const { user } = req;
  let allCourse = await LearningProcess.find({ userId: user._id });
  allCourse = await Promise.allSettled(allCourse.map(getLearningProcess));
  res.json(getDataFromAllSettled(allCourse));
};

export const learningProcess = async (req, res) => {
  const { user } = req;
  const { courseId } = req.params;
  let process = await LearningProcess.findOne({
    userId: user._id,
    courseId: courseId,
  });
  process = await getLearningProcess(process);
  res.json(process);
};

export const myCreatedCourses = async (req, res) => {
  const { user } = req;
  const allCourse = await Course.find({ creator: user._id }).populate([
    "modules",
    "tags",
    "category",
    "level",
  ]);
  res.send(allCourse);
};

export const deleteComment = async (req, res, next) => {
  const { course } = req;
  const { commentId } = req.params;
  const commentIndex = course.comments.findIndex((comment) =>
    comment._id.equals(commentId)
  );
  course.comments.splice(commentIndex, 1);
  const comments = await allComment(course);
  return res.json({ comments });
};

export const addComment = async (req, res, next) => {
  const { user, course } = req;
  const { content, url } = req.body;
  course.comments.push({
    content,
    url,
    accountId: user._id,
  });
  await course.save((err) => {
    if (err) {
      next(err);
    } else {
      res.json({ message: "Thêm bình luận thành công" });
    }
  });
};

export const getAllComment = async (req, res, next) => {
  const { course } = req;
  const comments = await allComment(course);
  return res.json({ comments });
};
