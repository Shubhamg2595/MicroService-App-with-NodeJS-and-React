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
  // console.log("received", req.body.data);
  const { type, data } = req.body;

  if (type === "Post Created") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
    res.status(200).send({});
  }

  if (type === "Comment added") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = {};
    comment[id] = { id, content, status };
    post.comments = { ...post.comments, ...comment };
    res.status(200).send({});
  }

  if (type === "comment updated") {
    console.log("query service posts ", posts);
    console.log("query service posts ", posts[data.postId].comments[data.id]);
    console.log("query service req.body", req.body);
    const updatedComment = {
      id: data.id,
      content: data.content,
      status: data.status,
    };
    posts[data.postId].comments[data.id] = updatedComment;
    res.status(200).send({});
  }
});

app.listen(3003, () => {
  console.log("query service listening on port 3003");
});
