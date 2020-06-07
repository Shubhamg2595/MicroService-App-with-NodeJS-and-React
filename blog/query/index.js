const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

function handleEvents(type, data) {
  if (type === "Post Created") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "Comment added") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = {};
    comment[id] = { id, content, status };
    post.comments = { ...post.comments, ...comment };
  }

  if (type === "comment updated") {
    console.log("query service posts ", posts);
    console.log("query service posts ", posts[data.postId].comments[data.id]);
    const updatedComment = {
      id: data.id,
      content: data.content,
      status: data.status,
    };
    posts[data.postId].comments[data.id] = updatedComment;
  }
}

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  // console.log("received", req.body.data);
  const { type, data } = req.body;

  handleEvents(type, data);
  res.status(200).send({});
});

app.listen(3003, async () => {
  console.log("query service listening on port 3003");

  const res = await axios.get("http://localhost:3005/events");

  for (let event of res.data) {
    console.log("processing events...");
    handleEvents(event.type, event.data);
  }
});

// to check power of eventBusStore concept, stop query service and create post and comment and then restart query service
