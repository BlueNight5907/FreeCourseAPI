import Account, { AccountType } from "../model/account";
import bcrypt from "bcrypt";
import config from "../config";
import { Level } from "../model/course";
import Category from "../model/category";
import Tag from "../model/tag";

const createAdminAccount = async () => {
  const adminType = (await AccountType.findOne({ name: "admin" }))._doc;
  const rootAccount = await Account.findOne({ type: adminType._id });
  if (rootAccount) {
    return;
  }

  console.log("Start create root account -----------------------");

  const password = "admin";
  const hashPassword = bcrypt.hashSync(password, parseInt(config.salt));

  const admin = new Account({
    email: "admin@tdt-learning.com",
    password: hashPassword,
    type: adminType._id,
    active: true,
    lockState: false,
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
      urlPath: "/frontend",
    },
    {
      name: "Back-end",
      urlPath: "/backend",
    },
    {
      name: "Lập trình cơ bản",
      urlPath: "/common-course",
    },
    {
      name: "UX/UI",
      urlPath: "/ux-ui",
    },
    {
      name: "Cơ sở dữ liệu",
      urlPath: "/database",
    },
    {
      name: "Cấu trúc dữ liệu",
      urlPath: "/data-structure",
    },
    {
      name: "Trí tuệ nhân tạo",
      urlPath: "/ai",
    },
    {
      name: "Khoa học dữ liệu",
      urlPath: "/data-science",
    },
    {
      name: "Quản trị hệ thống",
      urlPath: "/system-managenent",
    },
    {
      name: "Bảo mật",
      urlPath: "/security",
    },
    {
      name: "Game",
      urlPath: "/game",
    },
    {
      name: "Mobile",
      urlPath: "/mobile",
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

const createData = async () => {
  await addAccountType();
  await createAdminAccount();
  await addCourseLevel();
  await addCourseCategories();
  await addTags();
};
export default createData;
