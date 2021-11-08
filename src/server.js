const express = require("express");
const connect = require("./config/db");
const { register, login } = require("./controllers/user.controller");
const upload = require("./middlewares/file-upload");
const lectureController = require("./controllers/lectures.controller");
const studentController = require("./controllers/student.controller");

const app = express();
app.use(express.json());
app.post("/users/register", upload.single("productImages"), register);
app.post("/users/login", login);
app.use("/lectures", lectureController);
app.use("/students", studentController);

app.listen(2345, async function () {
  await connect();

  console.log("listening on port 2345");
});
