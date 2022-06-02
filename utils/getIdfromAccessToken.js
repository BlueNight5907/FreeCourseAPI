import accountModel from "../model/account.js";
import * as authMethod from '../utils/auth.js';
export const convertAccessTokenToId = async(accessToken, accessTokenSecret) => {
	const newAccessToken = accessToken.substring(7, accessToken.length);
	const decoded = await authMethod.decodeToken(
		newAccessToken,
		accessTokenSecret,
	);
	if (!decoded) {
		return null;
	}

	const email = decoded.payload.email; // Lấy email từ payload

	const account = await accountModel.find({email:email});
	return account[0]._id;
}