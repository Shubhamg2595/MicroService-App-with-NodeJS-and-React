const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const { id } = req.params;

  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[id] || [];

  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[id] = comments;

  await axios.post("http://localhost:3005/events", {
    type: "Comment added",
    data: {
      id: commentId,
      postId: id,
      content,
      status: "pending",
    },
  });
  // console.log(comments);
  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "comment update") {
    console.log("comments data", req.body);
    console.log("comments", commentsByPostId[data.postId]);
    if (commentsByPostId[data.postId]) {
      console.log(commentsByPostId[data.postId]);

      commentsByPostId[data.postId].status = data.status;
      await axios.post("http://localhost:3005/events", {
        type: "comment updated",
        data,
      });
    }

    res.send({});
  }
});

app.listen(3001, () => {
  console.log("Posts service started on Port 3001");
});
