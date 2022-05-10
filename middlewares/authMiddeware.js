//const jwtVariable = require('../../constants/jwt');
import {jwtVariable} from '../constants/jwt.js';
//const AccountModel = require('../model/account');
import AccountModel from '../model/account.js';
//const authMethod = require('../utils/auth');
import * as authMethod from '../utils/auth.js';

export const isAuth = async (req, res, next) => {
	// Lấy access token từ header
	const accessTokenFromHeader = req.headers["authorization"];
	if (!accessTokenFromHeader) {
		return res.status(401).send('Không tìm thấy access token!');
	}
	const token = accessTokenFromHeader.split(" ")[1];

	const accessTokenSecret =
		process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

	const verified = await authMethod.verifyToken(
		token,
		accessTokenSecret,
	);
	if (!verified) {
		return res
			.status(401)
			.send('Bạn không có quyền truy cập vào tính năng này - User!');
	}

	const user = await AccountModel.findOne({
		email: verified.payload.email,
	});
	if(!user) {
		return res.status(401).send("Bạn đã logout")
	}
	req.email = verified.payload.email;
	req.user = user;

	return next();
};

// exports.isAuthAdmin = async (req, res, next) => {
// 	// Lấy access token từ header
// 	const accessTokenFromHeader = req.headers["authorization"];
// 	if (!accessTokenFromHeader) {
// 		return res.status(401).send('Không tìm thấy access token!');
// 	}
// 	const token = accessTokenFromHeader.split(" ")[1];

// 	const accessTokenSecret =
// 		process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

// 	const verified = await authMethod.verifyToken(
// 		token,
// 		accessTokenSecret,
// 	);
// 	if (!verified) {
// 		return res
// 			.status(401)
// 			.send('Bạn không có quyền truy cập vào tính năng này - Admin!');
// 	}

// 	const user = await AccountModel.findOne({
// 		username: verified.payload.username,
// 		'tokens.accessToken': token
// 	});
// 	if(!user) {
// 		return res.status(401).send("Bạn đã logout")
// 	}
// 	if (user.isAdmin === true) {
// 		req.user = user;
// 	}
// 	else {
// 		return res.status(401).send("You are not admin")
// 	}

// 	return next();
// };
