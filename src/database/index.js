import mongoose from "mongoose";
import config from "../config";
import createData from "./init-data";

class Database {
  constructor() {
    this.url = config.databaseURL;
    this.dbName = config.dbName;
  }
  connect() {
    mongoose
      .connect(this.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: this.dbName,
      })
      .then(() => {
        console.log("Database connection successfull");
        createData();
      })
      .catch((error) => {
        console.log(error);
        console.error("Database connection error");
      });
  }
}
export default Database;
