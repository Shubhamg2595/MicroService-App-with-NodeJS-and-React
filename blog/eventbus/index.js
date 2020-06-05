const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const events = req.body;
  console.log('events',events);
  axios.post("http://localhost:3000/events", events); //posts
  axios.post("http://localhost:3001/events", events); //coomments
  axios.post("http://localhost:3003/events", events); //query
  // adding comment creation event for moderation service
  axios.post("http://localhost:3004/events", events); //moderate service
  // adding another rest call for updatedcomment from moderation service
  res.send({ status: "OK" });
});

app.listen(3005, () => {
  console.log("Event bus listening on port 3005");
});
