import Account from "../../model/account";
import GroupChat from "../../model/group-chat";
import { getDataFromAllSettled } from "../../utils/array-utils";
import { getAllGroupDetail, getAllUser } from "./group.method";
import mongoose from "mongoose";
import { existUser } from "../auth/auth.method";

export const createGroup = async (req, res, next) => {
  const { background, name } = req.body;
  const { user } = req;
  let group = new GroupChat({
    hostId: user._id,
    background,
    name,
    users: [user._id],
  });
  await group.save();
  user.groups.push(group._id);
  await user.save();
  group = group._doc;
  group.hostInformation = user.userInformation;
  group.users = await getAllUser(group.users);
  res.json(group);
};
export const allGroup = async (req, res, next) => {
  const groups = await getAllGroupDetail(await GroupChat.find({}));
  res.json(groups);
};
export const myGroup = async (req, res, next) => {
  const { user } = req;
  await user.populate("groups");
  const groups = await getAllGroupDetail(user.groups);
  res.json(groups);
};
export const updateGroup = async (req, res, next) => {
  const { background, name } = req.body;
  let { group } = req;
  group.background = background;
  group.name = name;
  await group.save();
  group = (await getAllGroupDetail([group]))[0];

  return res.json(group);
};
export const deleteGroup = async (req, res, next) => {
  let { group } = req;
  await Promise.allSettled(
    group.users.map(async (id) => {
      await Account.updateOne(
        {
          _id: id.toString(),
        },
        {
          $pullAll: {
            groups: [group._id],
            invites: [group._id],
          },
        }
      );
    })
  );
  await GroupChat.findByIdAndDelete(group._id);
  return res.json("Xóa nhóm thành công");
};
export const getGroup = async (req, res, next) => {
  let { group } = req;
  group = (await getAllGroupDetail([group]))[0];
  return res.json(group);
};
export const inviteUser = async (req, res, next) => {
  const { users } = req.body;
  const { group } = req;
  await Promise.allSettled(
    users.map(async (id) => {
      const account = await existUser(id);
      if (account) {
        account.invites.push(group._id);
        account.invites = [...new Set(account.invites)];
        await account.save();
      }
    })
  );
  res.json({ message: "Mời người dùng tham gia nhóm thành công" });
};
export const acceptInvite = async (req, res, next) => {
  const { group, user } = req;
  group.users.push(user._id);
  await group.save();
  await Account.findByIdAndUpdate(user._id, {
    $pullAll: {
      invites: [group._id],
    },
    $push: {
      groups: [group._id],
    },
  });
  return res.json((await getAllGroupDetail([group]))[0]);
};
export const leaveGroup = async (req, res, next) => {
  const { group, user } = req;
  await Account.findByIdAndUpdate(user._id, {
    $pullAll: {
      invites: [group._id],
      groups: [group._id],
    },
  });
  if (group.hostId.equals(user._id) && group.users?.length > 1) {
    group.hostId = group.users[1];
  }
  if (group.hostId.equals(user._id) && group.users?.length <= 1) {
    await GroupChat.findByIdAndDelete(group._id);
  } else {
    await GroupChat.findByIdAndUpdate(group._id, {
      $pullAll: {
        users: [user._id],
      },
      hostId: group.hostId,
    });
  }
  return res.json({ message: "Rời nhóm thành công" });
};
export const getMessage = async (req, res, next) => {};
export const kickUser = async (req, res, next) => {
  const { group, account } = req;
  await GroupChat.findByIdAndUpdate(group._id, {
    $pullAll: {
      users: [account._id],
    },
  });
  await Account.findByIdAndUpdate(account._id, {
    $pullAll: {
      invites: [group._id],
      groups: [group._id],
    },
  });
  return res.json({ message: "Xóa người dùng khỏi nhóm thành công" });
};
