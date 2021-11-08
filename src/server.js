const express = require("express");
const connect = require("./config/db");
const { register, login } = require("./controllers/user.controller");

const app = express();
app.use(express.json());

app.listen(2345, async function () {
  await connect();

  console.log("listening on port 2345");
});
