import accountModel from "../../model/account.js";

export const putEditAccount = async (req, res) => {
  //const accessToken = req.headers["authorization"];
  const fullName = req.body.fullName;
  const avatar = req.body.avatar;
  const birthDay = req.body.birthDay;
  const major = req.body.major;
  const address = req.body.address;
  const desc = req.body.desc;
  const others = req.body.others;

  const { email } = req;
  const user = await accountModel.findOne({ email: email });

  user.userInformation = {};
  user.userInformation.fullName = fullName;
  user.userInformation.avatar = avatar;
  user.userInformation.birthDay = birthDay;
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
  try {
    const acc = await accountModel.find({});
    res.status(200).send(acc);
  } catch (error) {
    res.send(error);
  }
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

  user.userInformation = {};
  user.userInformation.fullName = fullName;
  user.userInformation.avatar = avatar;
  user.userInformation.birthDay = birthDay;
  user.userInformation.major = major;
  user.userInformation.address = address;
  user.userInformation.desc = desc;
  user.userInformation.others = others;

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
  res.send(
    new Object({
      id: user._id,
      email: user.email,
      userInformation: user.userInformation,
    })
  );
};
