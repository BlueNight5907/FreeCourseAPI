import mongoose from "mongoose";

class Database {
  constructor(url) {
    this.url = url;
  }
  connect() {
    mongoose
      .connect(this.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connection successfull");
      })
      .catch((error) => {
        console.log(error);
        console.error("Database connection error");
      });
  }
}
export default Database;
