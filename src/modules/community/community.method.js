import Account from "../../model/account";

export const allComments = async (post) => {
  return Promise.allSettled(
    post.comments.map(async (comment) => {
      comment = comment._doc;
      comment.userInformation = (
        await Account.findById(comment.accountId)
      ).userInformation;
      return comment;
    })
  );
};
