const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://posts-clusterip-srv:3000/events", event); //posts
  // axios.post("http://localhost:3001/events", event); //coomments
  // axios.post("http://localhost:3003/events", event); //query
  // adding comment creation event for moderation service
  // axios.post("http://localhost:3004/events", event); //moderate service
  // adding another rest call for updatedcomment from moderation service
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(3005, () => {
  console.log("Event bus listening on port 3005");
});
