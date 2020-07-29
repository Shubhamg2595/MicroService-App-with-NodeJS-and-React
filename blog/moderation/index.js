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
    await axios.post("http://event-bus-srv:3005/events", {
      type: "comment update",
      data,
    });
  }
});

app.listen(3004, () => {
  console.log("moderation service running on port 3004");
});

//? why i created moderation service : because in long run there can be 'n; number of cases where we will need to update a specific comment in post like edit comment, flag a comment, upvote and downvote. Now all these features can be handled using moderation service. so even if this service fails, our commenting feature will work perfectly.


// ? to check usefulness of moderation service, just close this service and use the app
