import Account, { AccountType } from "../../model/account.js";
import accountModel from "../../model/account.js";
import { paginate } from "../../utils/mongoose-utils.js";

export const putEditAccount = async (req, res) => {
  const fullName = req.body.fullName;
  const avatar = req.body.avatar;
  const birthDay = req.body.birthDay;
  const major = req.body.major;
  const address = req.body.address;
  const desc = req.body.desc;
  const sid = req.body.sid;
  const background = req.body.background;
  const others = req.body.others;

  const { user } = req;

  user.userInformation = {};
  user.userInformation.fullName = fullName;
  user.userInformation.avatar = avatar;
  user.userInformation.background = background;
  user.userInformation.birthDay = birthDay;
  user.userInformation.sid = sid;
  user.userInformation.major = major;
  user.userInformation.address = address;
  user.userInformation.desc = desc;
  user.userInformation.others = others;

  user.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.json("Update Account successfully");
    }
  });
};

export const getAllAccount = async (req, res) => {
  const { page = 0, page_size = 10, sort, order = "desc" } = req.query;
  const accounts = await paginate(
    Account,
    page,
    page_size,
    sort ? { [sort]: order } : { date: order },
    {},
    ["type"]
  );
  res.send(accounts);
};

export const deleteAccount = async (req, res) => {
  const _id = req.params.id;
  const user = await accountModel.findByIdAndDelete(_id);

  user.save((err) => {
    if (err) {
      res.send(user);
    } else {
      res.json("Delete Account successfully");
    }
  });
};

export const editAccountAdmin = async (req, res) => {
  const _id = req.params.id;
  const user = await accountModel.findById(_id);

  if (!user) {
    return res.status(404).json({
      message: "Không tồn tại người dùng này",
    });
  }

  const fullName = req.body.fullName;
  const avatar = req.body.avatar;
  const birthDay = req.body.birthDay;
  const major = req.body.major;
  const address = req.body.address;
  const desc = req.body.desc;
  const others = req.body.others;
  const password = req.body.password;
  const sid = req.body.sid;
  const type = req.body.type;

  if (password) {
    const newPassword = bcrypt.hashSync(password, 10);
    user.password = newPassword;
  }

  if (type !== "admin") {
    const accountType = (await AccountType.findOne({ name: type }))._id;
    user.type = accountType;
  }

  user.userInformation.fullName = fullName;
  user.userInformation.avatar = avatar;
  user.userInformation.birthDay = birthDay;
  user.userInformation.major = major;
  user.userInformation.address = address;
  user.userInformation.desc = desc;
  user.userInformation.others = others;
  user.userInformation.sid = sid;

  user.save((err) => {
    if (err) {
      res.send(user);
    } else {
      res.json("Update Account successfully");
    }
  });
};

export const getInfoUser = async (req, res) => {
  const _id = req.params.id;
  const user = await accountModel.findById(_id);
  if (user) {
    res.send(
      new Object({
        id: user._id,
        email: user.email,
        userInformation: user.userInformation,
      })
    );
  } else res.status(404).send({ message: "not found" });
};

export const getMyAccount = async (req, res) => {
  let { user } = req;
  await user.populate("type");
  user = user._doc;
  delete user.password;
  return res.json(user);
};
