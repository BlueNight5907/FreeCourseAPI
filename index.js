import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { port } from "./utils/config.js";
import Database from "./utils/database.js";
import { databaseURL } from "./utils/config.js";
import __dirname from "path";

//Create app instance
const app = express();

app.use(express.static(__dirname + "/public"));
//use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Connect database
const database = new Database('mongodb://127.0.0.1:27017/learning-system');
database.connect();

// route
import accountRoute from "./routes/account.route.js";
import categoryRoute from "./routes/category.route.js";
import tagRoute from  "./routes/tag.route.js";
import indexRoute from "./routes/index.route.js";
import * as authMiddeware from './middlewares/authMiddeware.js';
//
app.use("/", indexRoute);
app.use("/account", authMiddeware.isAuth, accountRoute)
app.use("/category", categoryRoute);
app.use("/tag", tagRoute);

app.listen(port, () =>
  console.log("Server is listening on http://localhost:" + port)
);
