import courseModel from "../../model/course.js";
import accountModel from "../../model/account.js";
import Course, { Level } from "../../model/course.js";
import LearningProcess from "../../model/learning-process";
import { deleteSecureField } from "../../utils/mongoose-ultis.js";
import Account from "../../model/account.js";
import { getDataFromAllSettled } from "../../utils/array-utils.js";
import { allComment, getLearningProcess } from "./course.method.js";
import { paginate } from "../../utils/mongoose-utils.js";
import Lesson from "../../model/lesson.js";

export const getLevels = async (req, res, next) => {
  const levels = await Level.find({});
  res.json(levels);
};

export const search = async (req, res, next) => {
  const { q } = req.query;
  const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
  const searchRgx = rgx(q);

  const peers = await Course.find({
    $or: [
      { title: { $regex: searchRgx, $options: "i" } },
      { content: { $regex: searchRgx, $options: "i" } },
      { shortDesc: { $regex: searchRgx, $options: "i" } },
    ],
  })
    .populate(["tags", "category", "level"])
    .limit(20)
    .catch(next);
  res.json(peers);
};

export const teacherCourses = async (req, res, next) => {
  const { userId } = req.params;
  let allCourses = await Course.find({ creator: userId }).populate([
    "tags",
    "level",
    "category",
  ]);
  res.json(allCourses);
};

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

export const getCourses = async (req, res) => {
  const { page = 0, page_size = 10, tags, sort, order = "desc" } = req.query;
  const { categoryPath } = req.params;
  const { category } = req;

  const courses = await paginate(
    Course,
    page,
    page_size,
    sort ? { [sort]: order } : { createdAt: order },
    {
      ...(categoryPath !== "all" && { category: category?._id }),
      ...(tags && {
        tags: {
          $in: tags.split(","),
        },
      }),
    },
    ["level", "category", "tags"]
  );
  res.json(courses);
};
export const getInfoCourse = async (req, res) => {
  let { course } = req;
  await course.populate("level");
  await course.populate("category");
  await course.populate("modules");
  await course.populate("tags");

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
  const { page = 0, page_size = 10, sort, order = "desc" } = req.query;
  const courses = await paginate(
    Course,
    page,
    page_size,
    sort ? { [sort]: order } : { date: order },
    {},
    ["level", "category"]
  );
  res.json(courses);
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
  const modules = req.body.modules;

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
  course.modules = modules || course.modules;

  course.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send(course);
    }
  });
};

export const getCourse = async (req, res) => {
  const { course } = req;
  res.send(course);
};

export const deleteCourse = async (req, res) => {
  const _id = req.params.courseId;
  await courseModel.findByIdAndRemove(_id);
  await LearningProcess.deleteMany({ courseId: _id });
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
    const learningProccess = await LearningProcess.findOne({
      accountId: user._id,
      courseId: course._id,
    });
    const stu = new Object({
      _id: user._id,
      userInformation: user.userInformation,
      learningProccess,
    });
    stuList.push(stu);
  }
  res.send(stuList);
};

export const getNewRegister = async (req, res) => {
  const { course } = req;
  const studentList = course.participants.reverse();
  const stuList = [];
  for (let element of studentList) {
    const user = await accountModel.findById(element);
    const learningProccess = await LearningProcess.findOne({
      accountId: user._id,
      courseId: course._id,
    });
    const stu = new Object({
      _id: user._id,
      userInformation: user.userInformation,
      learningProccess,
    });
    stuList.push(stu);

    if (stuList.length > 5) {
      break;
    }
  }
  res.send(stuList);
};

export const myCourses = async (req, res) => {
  const { user } = req;
  let allCourse = await LearningProcess.find({ accountId: user._id });
  allCourse = await Promise.allSettled(allCourse.map(getLearningProcess));
  res.json(getDataFromAllSettled(allCourse));
};

export const learningProcess = async (req, res) => {
  const { user } = req;
  const { courseId } = req.params;
  let process = await LearningProcess.findOne({
    accountId: user._id,
    courseId: courseId,
  });
  process = await getLearningProcess(process);
  res.json(process);
};

export const myCreatedCourses = async (req, res) => {
  const { user } = req;
  const { page = 0, page_size = 10, sort, order = "desc" } = req.query;
  const courses = await paginate(
    Course,
    page,
    page_size,
    sort ? { [sort]: order } : { date: order },
    { creator: user._id },
    ["modules", "tags", "category", "level"]
  );
  res.send(courses);
};

export const deleteComment = async (req, res, next) => {
  const { course } = req;
  const { commentId } = req.params;
  const commentIndex = course.comments.findIndex((comment) =>
    comment._id.equals(commentId)
  );
  course.comments.splice(commentIndex, 1);
  await course.save();
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

export const ratingCourse = async (req, res, next) => {
  const { user, course } = req;
  const { point } = req.body;
  const rates = course.rates;
  const index = rates.findIndex((item) => item.accountId === user._id);
  if (index < 0) {
    course.rates.push({
      accountId: user._id,
      point: point,
    });
  } else {
    course.rates[index].point = point;
  }
  await course.save((err) => {
    if (err) {
      next(err);
    } else {
      res.json({ message: "Rating thành công" });
    }
  });
};

export const getAllComment = async (req, res, next) => {
  const { course } = req;
  const comments = await allComment(course);
  return res.json({ comments });
};
