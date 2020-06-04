const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  console.log("received", req.body.data);
  const { type, data } = req.body;

  if (type === "Post Created") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
    res.status(200).send({});
  }

  if (type === "Comment added") {
    const { id, content, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, content });
    res.status(200).send({});
  }
  console.log("posts", posts);
});

app.listen(3003, () => {
  console.log("query service listening on port 3003");
});
