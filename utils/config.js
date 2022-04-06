export const port = process.env.PORT || 8080;
export const databaseURL =
  process.env.DATABASE ||
  "mongodb://localhost:27017/MongoTest?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
