import courseModel from "../../model/course.js";
import accountModel from "../../model/account.js";
import { jwtVariable } from "../../constants/jwt.js";
import { Level } from "../../model/course.js";

// export const getAllTag = async(req, res) => {
// 	const tag = await tagModel.find({});
// 	res.send(tag);
// }

export const createCourse = async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const shortDesc = req.body.shortDesc;
  const background = req.body.background;
  const password = req.body.password;
  const level = req.body.level;
  const category = req.body.category;
  const tag = req.body.tag;
  const accessToken = req.headers.authorization;

  const accessTokenSecret =
    process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

  const _IdAccount = req.user._id;

  const course = new courseModel({
    title: title,
    content: content,
    shortDesc: shortDesc,
    background: background,
    password: password,
  });
  course.creator = _IdAccount;
  course.level = level;
  course.category = category;
  course.tags = tag;
  course.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send(course);
    }
  });
};

export const getInfoCourse = async (req, res) => {
  const _id = req.params.id;
  console.log(req.params.id);
  const course = await courseModel.findById(_id);
  const user = await accountModel.findById(course.creator);
  const level = await Level.findById(course.level);
  const infoCourse = new Object({
    title: course.title,
    content: course.content,
    shortDesc: course.shortDesc,
    background: course.background,
    level: level.name,
    creator: user.userInformation.fullName,
  });
  res.send(infoCourse);
};

export const getInfoAllCourse = async (req, res) => {
  const course = await courseModel.find();
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
  const tag = req.body.tag;
  const accessToken = req.headers.authorization;
  const id = req.params.id;
  const accessTokenSecret =
    process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

  const _IdAccount = req.user._id;

  const course = await courseModel.findById(id);
  console.log(course.creator);
  console.log(_IdAccount.equals(course.creator));
  if (_IdAccount.equals(course.creator) /* || type = "admin" */) {
    course.title = title;
    course.content = content;
    course.shortDesc = shortDesc;
    course.background = background;
    course.password = password;
    course.level = level;
    course.category = category;
    course.tags = tag;

    course.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Update Course Successfully");
      }
    });
  } else {
    res.send("Update Course Field");
  }
};

export const deleteCourse = async (req, res) => {
  const _id = req.params.id;
  await courseModel.findByIdAndRemove(_id);
  res.send("Delete Account Successfully");
};

export const joinCourse = async (req, res) => {
  const _id = req.params.id;
  const accessToken = req.headers.authorization;
  const accessTokenSecret =
    process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

  const _IdAccount = req.user._id;
  const course = await courseModel.findById(_id);
  console.log(course.participants);
  if (course.participants.indexOf(_IdAccount) !== -1) {
    res.send("User has join already");
  } else {
    course.participants.push(_IdAccount);
    course.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Join Course Successfully");
      }
    });
  }
};

export const unJoinCourse = async (req, res) => {
  const _id = req.params.id;
  const accessToken = req.headers.authorization;
  const accessTokenSecret =
    process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

  const _IdAccount = req.user._id;
  const course = await courseModel.findById(_id);
  if (course.participants.indexOf(_IdAccount) !== -1) {
    const indexUser = course.participants.indexOf(_IdAccount);
    course.participants.splice(indexUser, 1);
    course.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("unJoin Course Successfully");
      }
    });
  } else {
    res.send("You haven't joined the course yet");
  }
};

export const studentInCourse = async (req, res) => {
  const _id = req.params.id;
  const course = await courseModel.findById(_id);
  const studentList = course.participants;
  const stuList = [];
  for (let element of studentList) {
    const user = await accountModel.findById(element);
    const stu = new Object({
      name: user.userInformation.fullName,
    });
    stuList.push(stu);
  }
  res.send(stuList);
};
