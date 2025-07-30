const fs = require("fs");

const readData = (fileAddress) => {
  try {
    const data = fs.readFileSync(fileAddress, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data:", error);
    return null;
  }
};

const writeData = (fileAddress, data) => {
  try {
    console.log("Writing data to file:", fileAddress);
    console.log("Data being written:", data);
    fs.writeFileSync(fileAddress, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing data:", error);
  }
};

module.exports = {
  readData,
  writeData,
};

/*
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "My First Post", "content": "This is the body of the post."}'

  */
