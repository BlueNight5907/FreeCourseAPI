import Account from "../../model/account";
import Course from "../../model/course";
import { getDataFromAllSettled } from "../../utils/array-utils";
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
  const creator = await Account.findById(course.creator);
  course.creator = {
    ...creator.userInformation._doc,
    _id: creator._id,
  };
  return {
    ...learningProcess,
    courseData: course,
  };
};

export const allComment = async (course) => {
  const comments = await Promise.allSettled(
    course.comments.map(async (comment) => {
      comment = comment._doc;
      const account = await Account.findById(comment.accountId);
      comment.userInformation = account.userInformation;
      return comment;
    })
  );
  return getDataFromAllSettled(comments);
};
