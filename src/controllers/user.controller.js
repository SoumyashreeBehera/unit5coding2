const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");
const User = require("../models/user.model");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.SECRET_KEY);
};

const register = async (req, res) => {
  const files = req.file.path;
  try {
    //find if that user is existed if exists throw an error
    let user = await User.findOne({ email: req.body.email }).lean().exec();
    if (user) {
      fs.unlinkSync(files);
      return res
        .status(401)
        .json({ status: "failed", message: "user already exists" });
    }

    //else create an user account and hash the password
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      profile_pic: files,
      // roles: [""],
    });

    //create a token and send user and token to frontend
    const token = newToken(user);

    return res.status(401).json({ user, token });
  } catch (err) {
    fs.unlinkSync(files);
    return res.status(401).json({ status: "failed", message: err.message });
  }
};

const login = async (req, res) => {
  try {
    //find if that user is existed if not exists throw an error
    let user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res
        .status(401)
        .json({ status: "failed", message: "user dosen't exists" });
    }

    //else check the password
    const match = user.checkPassword(req.body.password);

    //if password doesnot match throw an error
    if (!match)
      return res
        .status(401)
        .json({ status: "failed", message: "invalid password" });

    //create a token and send user and token to frontend
    const token = newToken(user);

    return res.status(401).json({ user, token });
  } catch (err) {
    return res.status(401).json({ status: "failed", message: err.message });
  }
};

module.exports = { register, login };
