const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(
  cors({
    origin: "https://touristguideproject.vercel.app", // Allow only your frontend domain
  })
);
app.use(bodyParser.json());

const users = [
  { username: "Vikash", password: "Vikash12345" },
  { username: "Saptak", password: "Saptak12345" },
  { username: "Kapish", password: "Kapish12345" },
  { username: "Yuvan", password: "Yuvan12345" },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

module.exports = app;
//hey
