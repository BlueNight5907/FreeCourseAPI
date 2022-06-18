import accountModel from "../../model/account.js";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import * as authMethod from "../auth/auth.method";
import { jwtVariable } from "../../constants/jwt.js";
import nodemailer from "nodemailer";

export const postSignup = async (req, res) => {
  const fullName = req.body.fullName;
  const avatar = req.body.avatar;
  const birthDay = req.body.birthDay;
  const major = req.body.major;
  const address = req.body.address;
  const desc = req.body.desc;
  const others = req.body.others;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const active = req.body.active;
  const refreshToken = randomBytes(100).toString("hex");
  const accountType = req.body.accountType;
  const privileges = req.body.privileges;

  if (confirmPassword != password) {
    res.json("Confirm password does not match");
  } else {
    accountModel.findOne({ email: email }, (err, user) => {
      if (err) {
        res.send(err);
      } else if (user) {
        res.json("User has been already");
      } else {
        const newPassword = bcrypt.hashSync(password, 10);
        user = new accountModel({
          email: email,
          password: newPassword,
          refreshToken: refreshToken,
        });
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
            res.json("Signup successfully");
          }
        });
      }
    });
  }
};

export const postSingin = async (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  const user = (await accountModel.findOne({ email: email }))._doc;
  if (!user) {
    return res.status(401).send("Tên đăng nhập không tồn tại.");
  } else if (!user.active) {
    return res.status(401).send("Bạn chưa active tài khoản");
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send("Mật khẩu không chính xác.");
  }

  const accessTokenLife = jwtVariable.accessTokenLife;
  const accessTokenSecret = jwtVariable.accessTokenSecret;

  const dataForAccessToken = {
    email: user.email,
  };
  const accessToken = await authMethod.generateToken(
    dataForAccessToken,
    accessTokenSecret,
    accessTokenLife
  );
  if (!accessToken) {
    return res
      .status(401)
      .send("Đăng nhập không thành công, vui lòng thử lại.");
  }
  const refreshToken = user.refreshToken;

  delete user.password;
  return res.json({
    msg: "Đăng nhập thành công.",
    accessToken,
    refreshToken,
    user,
  });
};

export const putUpdatePassword = async (req, res) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;
  const { email } = req;
  const user = await accountModel.findOne({ email: email });

  const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);
  if (!isPasswordValid) {
    return res.status(401).send("Mật khẩu cũ không chính xác.");
  } else if (confirmPassword != newPassword) {
    return res.status(401).send("Confirm Password không chính xác!");
  } else {
    user.password = bcrypt.hashSync(newPassword, 10);
    user.save(function (err) {
      if (err) {
        res.send(err);
      } else {
        res.json("Update Password successfully");
      }
    });
  }
};

export const refreshToken = async (req, res) => {
  // Lấy access token từ header
  const accessTokenFromHeader = req.headers.authorization;
  console.log(accessTokenFromHeader);
  if (!accessTokenFromHeader) {
    return res.status(400).send("Không tìm thấy access token.");
  }

  // Lấy refresh token từ body
  const refreshTokenFromBody = req.body.refreshToken;
  if (!refreshTokenFromBody) {
    return res.status(400).send("Không tìm thấy refresh token.");
  }

  const accessTokenSecret = jwtVariable.accessTokenSecret;
  const accessTokenLife = jwtVariable.accessTokenLife;

  // Decode access token đó
  const newAccessTokenFromHeader = accessTokenFromHeader.substring(
    jwtVariable.bearerLength,
    accessTokenFromHeader.length
  );
  const decoded = await authMethod.decodeToken(
    newAccessTokenFromHeader,
    accessTokenSecret
  );
  if (!decoded) {
    return res.status(400).send("Access token không hợp lệ.");
  }

  const email = decoded.payload.email; // Lấy email từ payload

  const user = await accountModel.findOne({ email: email });
  if (!user) {
    return res.status(401).send("User không tồn tại.");
  }

  if (refreshTokenFromBody !== user.refreshToken) {
    return res.status(400).send("Refresh token không hợp lệ.");
  }

  // Tạo access token mới
  const dataForAccessToken = {
    email,
  };

  const accessToken = await authMethod.generateToken(
    dataForAccessToken,
    accessTokenSecret,
    accessTokenLife
  );
  if (!accessToken) {
    return res
      .status(400)
      .send("Tạo access token không thành công, vui lòng thử lại.");
  }
  return res.json({
    accessToken,
  });
};

export const activeAccount = async (req, res) => {
  const _id = req.body.id;
  const user = await accountModel.findById(_id);
  user.active = true;
  user.save((err) => {
    if (err) {
      res.send(err);
    } else {
      var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "learning.system.info@gmail.com",
          pass: "012339969890Dang",
        },
      });
      var mailOptions = {
        from: "learning.system.info@gmail.com",
        to: user.email,
        subject: "ACTIVE ACCOUNT",
        text: "Your account has been active successfully.",
      };
      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          return res.status(500).send({ msg: err });
        }
        return res.status(200).send("Active account successfully!");
      });
    }
  });
};
