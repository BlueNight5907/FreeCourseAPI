import mongoose from "mongoose";

class Database {
  constructor(url) {
    this.url = url;
  }
  connect() {
    mongoose
      .connect(this.url)
      .then(() => {
        console.log("Database connection successfull");
      })
      .catch((error) => {
        console.log(err);
        console.error("Database connection error");
      });
  }
}
export default Database;
