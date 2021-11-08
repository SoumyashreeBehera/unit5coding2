const express = require("express");
const router = express.Router();
const Student = require("../models/student.model");

router.post("", async function (req, res) {
  try {
    let student = await Student.create(req.body);
    return res.status(200).json({ student });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
});

router.get("", async function (req, res) {
  try {
    let student = await Student.find().lean().exec();
    return res.status(200).json({ data: student });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
});
module.exports = router;
