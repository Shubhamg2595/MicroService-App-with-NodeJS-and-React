const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(cors());
app.use(bodyParser.json());

const flagComment = (comment) => {
  if (comment.includes("orange")) {
    return true;
  }
  return false;
};

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "Comment added") {
    const toBeFlagged = flagComment(data.content);
    if (toBeFlagged) {
      data.status = "rejected";
    } else {
      data.status = "confirmed";
    }
    console.log("ms service", data);
    await axios.post("http://localhost:3005/events", {
      type: "comment update",
      data,
    });
  }
});

app.listen(3004, () => {
  console.log("moderation service running on port 3004");
});
