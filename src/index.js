// import app package
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from "./config";
import Database from "./database";
import path from "path";
import routes from "./routes";
import * as helmet from "helmet";
import rateLimit from "express-rate-limit";

// Create app instance
const app = express();

export const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 12 hours duration
  max: 500,
  message: "Too many connection",
});

// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(apiLimiter);

// Helmet full option
// app.use(helmet.contentSecurityPolicy());
// app.use(helmet.crossOriginEmbedderPolicy());
// app.use(helmet.crossOriginOpenerPolicy());
// app.use(helmet.crossOriginResourcePolicy());
// app.use(helmet.dnsPrefetchControl());
// app.use(helmet.expectCt());
// app.use(helmet.frameguard());
// app.use(helmet.hidePoweredBy());
// app.use(helmet.hsts());
// app.use(helmet.ieNoOpen());
// app.use(helmet.noSniff());
// app.use(helmet.originAgentCluster());
// app.use(helmet.permittedCrossDomainPolicies());
// app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter()); // X-XSS-Protection

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
