const express = require("express");
const PORT = process.env.PORT || 5000;
const path = require("path");
const { randomUUID } = require("crypto");

const app = express();

app.use(express.json());
app.use(require("cors")());

const { readData, writeData } = require("./utils");
const postsFile = path.join(__dirname, "posts.json");

// Sample route
app.post("/posts", (req, res) => {
  const post = req.body;
  // Here you would typically save the post to a database

  const posts = readData(postsFile) || [];
  post.id = randomUUID();
  posts.push(post);
  writeData(postsFile, posts);

  res.status(201).json(post);
});

app.get("/posts", (req, res) => {
  // Here you would typically fetch posts from a database
  const posts = readData(postsFile) || [];
  res.status(200).json(posts);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Blog API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
