import Account from "../../model/account";
import Course from "../../model/course";
import { deleteSecureField } from "../../utils/mongoose-ultis";

export const getLearningProcess = async (learningProcess) => {
  learningProcess = deleteSecureField(learningProcess._doc);
  let course = await Course.findById(learningProcess.courseId).populate([
    "modules",
    "tags",
    "category",
    "level",
  ]);
  course = deleteSecureField(course._doc);
  course.creator = (await Account.findById(course.creator)).userInformation;
  console.log(course);
  return {
    ...learningProcess,
    courseData: course,
  };
};
