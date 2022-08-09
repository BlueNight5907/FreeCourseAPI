import Account, { AccountType } from "../model/account";
import bcrypt from "bcrypt";
import path from "path";
import config from "../config";
import Course, { Level } from "../model/course";
import Category from "../model/category";
import Tag from "../model/tag";
import Lesson from "../model/lesson";
import Module from "../model/module";
import { readFile } from "../utils/fileSystem";
import { getDataFromAllSettled } from "../utils/array-utils";

const createAdminAccount = async () => {
  const adminType = (await AccountType.findOne({ name: "admin" }))._doc;
  const rootAccount = await Account.findOne({ type: adminType._id });
  if (rootAccount) {
    return;
  }

  console.log("Start create root account -----------------------");

  const password = "admin123";
  const hashPassword = bcrypt.hashSync(password, parseInt(config.salt));

  const admin = new Account({
    email: "admin@tdt-learning.com",
    password: hashPassword,
    refreshToken: randomBytes(100).toString("hex"),
    type: adminType._id,
    active: true,
    lockState: false,
    userInformation: {
      fullName: "Super Admin",
      avatar: "/public/user/admin-avatar.png",
    },
  });

  await admin.save().then((_) => console.log("Create admin successfully"));
};

const addAccountType = async () => {
  const existAccountType = (await AccountType.estimatedDocumentCount()) > 1;
  if (!existAccountType) {
    console.log("Start create account type -----------------------");
    const studentType = new AccountType({ name: "student" });
    const task1 = studentType
      .save()
      .then((_) => console.log("Create student type successfully"));

    const teacherType = new AccountType({ name: "teacher" });
    const task2 = teacherType
      .save()
      .then((_) => console.log("Create teacher type successfully"));

    const adminType = new AccountType({ name: "admin" });
    const task3 = adminType
      .save()
      .then((_) => console.log("Create admin type successfully"));

    await task1;
    await task2;
    await task3;
  }
};

const addCourseLevel = async () => {
  const existCourseLevel = (await Level.estimatedDocumentCount()) > 1;
  if (existCourseLevel) return;

  console.log("Start create course level -----------------------");
  const newbieLevel = new Level({ name: "Mới bắt đầu" });
  const task1 = newbieLevel
    .save()
    .then((_) => console.log("Create start level successfully"));

  const commonLevel = new Level({ name: "Cơ bản" });
  const task2 = commonLevel
    .save()
    .then((_) => console.log("Create common level successfully"));

  const advancedLevel = new Level({ name: "Nâng cao" });
  const task3 = advancedLevel
    .save()
    .then((_) => console.log("Create advanced level successfully"));

  await task1;
  await task2;
  await task3;
};

const addCourseCategories = async () => {
  const existCategory = (await Category.estimatedDocumentCount()) > 1;
  if (existCategory) return;

  console.log("Start create categories -----------------------");

  const categories = [
    {
      name: "Front-end",
      urlPath: "frontend",
    },
    {
      name: "Back-end",
      urlPath: "backend",
    },
    {
      name: "Lập trình cơ bản",
      urlPath: "common-course",
    },
    {
      name: "UX/UI",
      urlPath: "ux-ui",
    },
    {
      name: "Cơ sở dữ liệu",
      urlPath: "database",
    },
    {
      name: "Cấu trúc dữ liệu",
      urlPath: "data-structure",
    },
    {
      name: "Trí tuệ nhân tạo",
      urlPath: "ai",
    },
    {
      name: "Khoa học dữ liệu",
      urlPath: "data-science",
    },
    {
      name: "Quản trị hệ thống",
      urlPath: "system-managenent",
    },
    {
      name: "Bảo mật",
      urlPath: "security",
    },
    {
      name: "Game",
      urlPath: "game",
    },
    {
      name: "Mobile",
      urlPath: "mobile",
    },
  ];

  await Promise.allSettled(
    categories.map(async (item) => {
      const category = new Category(item);
      return await category
        .save()
        .then(() => console.log(`Create category "${item.name}" successfully`));
    })
  );
};

const addTags = async () => {
  const existTag = (await Tag.estimatedDocumentCount()) > 1;
  if (existTag) return;

  console.log("Start create tags -----------------------");

  const tags = [
    {
      name: "ReactJS",
    },
    {
      name: "ExpressJS",
    },
    {
      name: "NestJS",
    },
    {
      name: "VueJS",
    },
    {
      name: "Angular",
    },
    {
      name: "OOP",
    },
    {
      name: "Python",
    },
    {
      name: "Java",
    },
    {
      name: "JavaScript",
    },
    {
      name: "C#",
    },
    {
      name: ".Net Core",
    },
    {
      name: "Golang",
    },
    {
      name: "Web",
    },
    {
      name: "WebAPI",
    },
    {
      name: "Web Service",
    },
    {
      name: "AI",
    },
    {
      name: "Data",
    },
    {
      name: "Xử lý ảnh",
    },
    {
      name: "PHP",
    },
    {
      name: "Unreal Engine 4",
    },
    {
      name: "Unity",
    },
    {
      name: "Design",
    },
    {
      name: "Android",
    },
    {
      name: "React Native",
    },
    {
      name: "Flutter",
    },
  ];

  await Promise.allSettled(
    tags.map(async (item) => {
      const tag = new Tag(item);
      return await tag
        .save()
        .then(() => console.log(`Create tag "${item.name}" successfully`));
    })
  );
};

const readCourseData = async () => {
  const coursesURL = path.resolve("./src/data/courses.json");
  const fileData = await readFile(coursesURL);
  const courses = JSON.parse(fileData).data;
  return courses;
};

const generateCourse = async () => {
  const courses = await readCourseData();
  const admin = await Account.findOne({ email: "admin@tdt-learning.com" });
  Promise.all(
    courses.map(async (course, index) => {
      let {
        title,
        shortDesc,
        content,
        background,
        gains,
        tags,
        categoryPath,
        level,
        modules,
      } = course;
      // console.log(`${index}. Checking course "${title}" start-----------`);
      if (index === courses.length - 1) {
        // console.log("\n--------------------------\n");
      }
      const existCourse = await Course.findOne({ title });
      if (existCourse) {
        // console.log(`Course "${title}" has been created`);
        return null;
      }
      const category = (await Category.findOne({ urlPath: categoryPath }))._id;
      level = (await Level.findOne({ name: level }))._id;
      tags = await Promise.all(
        tags.map(async (name) => {
          const tag = await Tag.findOne({ name });
          return tag._id;
        })
      );

      const newCourse = new Course({
        creator: admin._id,
        title,
        shortDesc,
        content,
        background,
        gains,
        category,
        level,
        tags,
      });
      const courseModules = await Promise.all(
        modules.map(async (data) => {
          const steps = await Promise.all(
            data.steps.map(async (item) => {
              const lesson = new Lesson({
                type: item.resourceType,
                url: item.url,
                content: item.content,
              });
              await lesson.save();
              return {
                title: item.title,
                type: item.type,
                time: item.time,
                content: lesson._id,
              };
            })
          );

          const module = new Module({
            courseId: newCourse._id,
            title: data.title,
            steps,
          });

          await module.save();
          return module._id;
        })
      );

      newCourse.modules = courseModules;
      await newCourse.save();
      console.log(`Create course "${title}" successfully`);
    })
  );
};
const createData = async () => {
  await addAccountType();
  await createAdminAccount();
  await addCourseLevel();
  await addCourseCategories();
  await addTags();
  generateCourse();
};
export default createData;
