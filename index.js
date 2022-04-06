import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { port } from "./utils/config.js";
import Database from "./utils/database.js";
import { databaseURL } from "./utils/config.js";
import Test from "./test-model.js";
//Connect database
const database = new Database(databaseURL);
database.connect();

//Create app instance
const app = express();

app.get("/", async (req, res) => {
  try {
    const newTest = new Test({
      name: {},
      points: [1, 2],
    });

    await newTest.save();
    res.send(newTest);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.listen(port, () =>
  console.log("Server is listening on http://localhost:" + port)
);
