const express = require("express");
const authenticate = require("../middlewares/authenticate");
const { authorize, authorizeOne } = require("../middlewares/authorize");
const router = express.Router();
const Lecture = require("../models/lectures.model");

router.post(
  "",
  authenticate,
  authorize(["admin", "instructor"]),
  async function (req, res) {
    try {
      let lecture = await Lecture.create(req.body);
      return res.status(200).json({ lecture });
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  }
);

router.patch("/:id", authenticate, authorizeOne(), async function (req, res) {
  try {
    let lecture = await Lecture.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).json({ lecture });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
});

router.get("", async function (req, res) {
  try {
    let lecture = await Lecture.find().lean().exec();
    return res.status(200).json({ data: lecture });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
});
module.exports = router;
