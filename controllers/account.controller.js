import accountModel from "../model/account.js";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import * as authMethod from '../utils/auth.js';

import {jwtVariable} from '../constants/jwt.js';
import nodemailer from "nodemailer";

export const getSignup = async(req, res) => {
	res.send("Signup page");
}

export const postSignup = async(req, res) => {
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
	const refreshToken = randomBytes(100).toString('hex');
	const accountType = req.body.accountType;
	const privileges = req.body.privileges;


	if (confirmPassword != password) {
		res.json("Confirm password does not match");
	} else {
		accountModel.findOne({email:email}, (err, user) => {
			if (err) {
				res.send(err);
			} else if (user) {
				res.json("User has been already");
			} else {
				const newPassword = bcrypt.hashSync(password, 10);
				user = new accountModel({email: email, password: newPassword, refreshToken: refreshToken});
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
				})
			}
		})
	}
}

export const getSignin = async(req, res) => {
	res.send("Signin page");
}

export const postSingin = async(req, res) => {
	const email = req.body.email.toLowerCase();
	const password = req.body.password;

	const user = await accountModel.findOne({email: email});
	if (!user) {
		return res.status(401).send('Tên đăng nhập không tồn tại.');
	}
	else if (!user.active) {
		return res.status(401).send("Bạn chưa active tài khoản")
	}
	const isPasswordValid = bcrypt.compareSync(password, user.password);
	if (!isPasswordValid) {
		return res.status(401).send('Mật khẩu không chính xác.');
	}

	const accessTokenLife =
		process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;
	const accessTokenSecret =
		process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

	const dataForAccessToken = {
		email: user.email,
	};
	const accessToken = await authMethod.generateToken(
		dataForAccessToken,
		accessTokenSecret,
		accessTokenLife,
	);
	if (!accessToken) {
		return res
			.status(401)
			.send('Đăng nhập không thành công, vui lòng thử lại.');
	}
	const refreshToken = user.refreshToken;

	return res.json({
		msg: 'Đăng nhập thành công.',
		accessToken,
		refreshToken,
		user,
	});
}

export const putEditAccount = async(req, res) => {
	//const accessToken = req.headers["authorization"];
	const fullName = req.body.fullName;
	const avatar = req.body.avatar;
	const birthDay = req.body.birthDay;
	const major = req.body.major;
	const address = req.body.address;
	const desc = req.body.desc;
	const others = req.body.others;

	const {email} = req;
	const user = await accountModel.findOne({email: email});

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
	})
}

export const putUpdatePassword = async(req, res) => {
	const oldPassword = req.body.oldPassword;
	const newPassword = req.body.newPassword;
	const confirmPassword = req.body.confirmPassword;
	const {email} = req;
	const user = await accountModel.findOne({email: email});

	const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);
	if (!isPasswordValid) {
		return res.status(401).send('Mật khẩu cũ không chính xác.');
	} else if (confirmPassword != newPassword) {
		return res.status(401).send('Confirm Password không chính xác!');
	} else {
		user.password = bcrypt.hashSync(newPassword, 10);
		user.save(function (err) {
			if (err) {
				res.send(err);
			} else {
				res.json("Update Password successfully");
			}
		})
	}
}

export const getAllAccount = async(req,res) => {
	try {
		const acc = await accountModel.find({});
		res.status(200).send(acc);
	} catch (error) {
		res.send(error);
	}
}

export const deleteAccount = async(req, res) => {
	const _id = req.params.id;
	const user = await accountModel.findByIdAndDelete(_id);

	user.save((err)=> {
	 	if (err) {
			res.send(user);
	 	} else {
	 		res.json("Delete Account successfully");
	 	}
	})
}

export const editAccountAdmin = async(req, res) => {
	const _id = req.params.id;
	const user = await accountModel.findById(_id);

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

	user.save((err)=> {
		if (err) {
		   res.send(user);
		} else {
			res.json("Update Account successfully");
		}
   })
}

export const getInfoUser = async(req, res) => {
	const _id = req.params.id;
	const user = await accountModel.findById(_id);
	res.send(new Object({
		id: user._id,
		email: user.email,
		userInformation: user.userInformation
	}))
}

export const refreshToken = async(req, res) => {
	// Lấy access token từ header
	const accessTokenFromHeader = req.headers.authorization;
	if (!accessTokenFromHeader) {
		return res.status(400).send('Không tìm thấy access token.');
	}

	// Lấy refresh token từ body
	const refreshTokenFromBody = req.body.refreshToken;
	if (!refreshTokenFromBody) {
		return res.status(400).send('Không tìm thấy refresh token.');
	}

	const accessTokenSecret =
		process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
	const accessTokenLife =
		process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;

	// Decode access token đó
	const newAccessTokenFromHeader = accessTokenFromHeader.substring(7, accessTokenFromHeader.length);
	const decoded = await authMethod.decodeToken(
		newAccessTokenFromHeader,
		accessTokenSecret,
	);
	if (!decoded) {
		return res.status(400).send('Access token không hợp lệ.');
	}

	const email = decoded.payload.email; // Lấy email từ payload

	const user = await accountModel.findOne({email: email});
	if (!user) {
		return res.status(401).send('User không tồn tại.');
	}

	if (refreshTokenFromBody !== user.refreshToken) {
		return res.status(400).send('Refresh token không hợp lệ.');
	}

	// Tạo access token mới
	const dataForAccessToken = {
		email,
	};

	const accessToken = await authMethod.generateToken(
		dataForAccessToken,
		accessTokenSecret,
		accessTokenLife,
	);
	if (!accessToken) {
		return res
			.status(400)
			.send('Tạo access token không thành công, vui lòng thử lại.');
	}
	return res.json({
		accessToken,
	});
}

export const activeAccount = async(req, res) => {
	const _id = req.body.id;
	const user = await accountModel.findById(_id);
	user.active = true;
	user.save((err) => {
		if (err) {
			res.send(err)
		} else {
			var transporter = nodemailer.createTransport({ 
				service: 'Gmail', 
				auth: { 
					user: "learning.system.info@gmail.com",
					pass: "012339969890Dang"
				}
			});
			var mailOptions = { from: 'learning.system.info@gmail.com', to: user.email, subject: 'ACTIVE ACCOUNT', text: 'Your account has been active successfully.' };
			transporter.sendMail(mailOptions, function (err) {
				if (err) {
					return res.status(500).send({msg:err});
					}
				return res.status(200).send('Active account successfully!');
			});
		}
	})
}