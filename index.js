import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { port } from "./utils/config.js";
import Database from "./utils/database.js";
import { databaseURL } from "./utils/config.js";
import moduleRoute from "./route/moduleRoute.js";
//Connect database
const database = new Database(databaseURL);
database.connect();

//Create app instance
const app = express();

const testMdw = (req, res, next) => {
  req.name = "abcd";
  next();
};

app.get("/", testMdw, async (req, res) => {
  console.log(req.name);
  res.send(req.name);
});

app.use("/module", moduleRoute);

app.listen(port, () =>
  console.log("Server is listening on http://localhost:" + port)
);
