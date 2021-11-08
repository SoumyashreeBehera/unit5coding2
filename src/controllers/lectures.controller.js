const express = require("express");
const router = express.Router();
const Lecture = require("../models/lectures.model");

router.post("", async function (req, res) {
  try {
    let lecture = await Lecture.create(req.body);
    return res.status(200).json({ lecture });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
});

router.get("", async function (req, res) {
  try {
    let lecture = await Lecture.find().populate("instructor").lean().exec();
    return res.status(200).json({ data: lecture });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
});
module.exports = router;
