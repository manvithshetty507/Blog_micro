const express = require("express");
const PORT = process.env.PORT || 5001;
const app = express();
const path = require("path");
const { readData, writeData } = require("./utils");

const commentsPath = path.join(__dirname, "comments.json");
// Middleware to parse JSON bodies
app.use(express.json());
app.use(require("cors")());

// Sample route to handle comments

app.post("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const comment = req.body;

  if (!comment || !comment.text) {
    return res.status(400).json({ error: "Comment text is required" });
  }
  const commentsData = readData(commentsPath) || [];
  commentsData.push({ postId: id, comment });
  writeData(commentsPath, commentsData);

  res.status(201).json({
    message: "Comment added successfully",
    comment,
  });
});

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const commentsData = readData(commentsPath) || [];

  if (!commentsData || commentsData.length === 0) {
    return res.status(500).json({ error: "Failed to read comments data" });
  }

  // Filter comments for the specific post
  const comments = commentsData.filter((c) => c.postId === id);

  res.status(200).json({
    postId: id,
    commentsData: commentsData,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/*
curl -X POST http://localhost:3001/posts/8aed5785-6656-4a09-9792-4066230305fe/comments \
-H "Content-Type: application/json" \
-d '{"text": "This is a 2nd comment"}' 
*/
