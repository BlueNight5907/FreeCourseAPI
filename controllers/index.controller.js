import accountModel from "../model/account.js";
import bcrypt from "bcrypt";
import crypto from "crypto-js";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";

export const index = async(req, res) => {
	res.send("Index page");
}