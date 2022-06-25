import Account from "../../model/account";
import { getDataFromAllSettled } from "../../utils/array-utils";

export const getAllUser = async (users) => {
  const allUsers = await Promise.allSettled(
    users.map(async (item) => {
      const account = await Account.findById(item);
      return { _id: item, userInformation: account.userInformation };
    })
  );
  return getDataFromAllSettled(allUsers);
};

export const getAllGroupDetail = async (groups) => {
  const allGroups = await Promise.allSettled(
    groups.map(async (group) => {
      group = group._doc;
      const account = await Account.findById(group.hostId);
      group.hostInformation = account.userInformation;
      group.users = await getAllUser(group.users);
      delete group.messages;
      return group;
    })
  );
  return getDataFromAllSettled(allGroups);
};
