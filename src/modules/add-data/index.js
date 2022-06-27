import { readFile, writeFile } from "../../utils/fileSystem";
import path from "path";

const readCourseData = async () => {
  const coursesURL = path.resolve("./src/data/courses.json");
  const fileData = await readFile(coursesURL);
  const courses = JSON.parse(fileData).data;
  return courses;
};

const writeCourseData = async (courses) => {
  const coursesURL = path.resolve("./src/data/courses.json");
  const fileData = JSON.stringify({ data: courses });
  const result = await writeFile(coursesURL, fileData);
  return result;
};

export const addData = async (req, res) => {
  const courses = await readCourseData();
  const course = req.body;
  courses.push(course);
  const result = await writeCourseData(courses);
  res.json({ result });
};
