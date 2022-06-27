// import app package
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from "./config";
import Database from "./database";
import path from "path";
import routes from "./routes";

// Create app instance
const app = express();

// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Turn on cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

// Get app directory name
const __dirname = path.resolve();
// Init static folder
app.use("/public", express.static(__dirname + "/public"));

// Connect database
const database = new Database();
database.connect();

// App routes
routes(app);

app.listen(config.port, () =>
  console.log("Server is listening on http://localhost:" + config.port)
);
