import fileSystem from "fs";

const fs = fileSystem.promises;
async function moveFile(source, destination) {
  try {
    await fs.rename(source, destination);
    console.log(`Moved file from ${source} to ${destination}`);
  } catch (error) {
    console.error(`Got an error trying to move the file: ${error.message}`);
  }
}
async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return data;
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

async function writeFile(filePath, data) {
  try {
    await fs.writeFile(filePath, data);
    return data;
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

async function existFile(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
    return false;
  }
}

async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(`Deleted ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Got an error trying to delete the file: ${error.message}`);
    return false;
  }
}
export { moveFile, readFile, writeFile, deleteFile, existFile };
