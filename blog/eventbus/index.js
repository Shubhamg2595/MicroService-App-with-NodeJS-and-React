const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const events = req.body;

  axios.post("http://localhost:3000/events", events); //posts
  axios.post("http://localhost:3001/events", events); //coomments
  axios.post("http://localhost:3003/events", events); //query

  res.send({ status: "OK" });
});


app.listen(3005, () => {
    console.log('Event bus listening on port 3005')
})