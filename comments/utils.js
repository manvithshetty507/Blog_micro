const fs = require("fs");

const readData = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading data from ${filePath}:`, error);
    return null;
  }
};

const writeData = (filePath, data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, "utf8");
    console.log(`Data successfully written to ${filePath}`);
  } catch (error) {
    console.error(`Error writing data to ${filePath}:`, error);
  }
};

module.exports = {
  readData,
  writeData,
};
