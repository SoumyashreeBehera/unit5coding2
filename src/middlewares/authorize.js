const Lecture = require("../models/lectures.model");

const authorize = (given) => {
  return function (req, res, next) {
    const user = req.user;
    const isPermitted = given.includes(user.roles);
    if (!isPermitted) return res.status(401).send("you are not permitted");
    return next();
  };
};

const authorizeOne = (given) => {
  return async function (req, res, next) {
    const lecture = await Lecture.findById(req.params.id).lean().exec();
    const user = req.user;

    if (user.roles == "admin") return next();
    else if (user.roles == "instructor" && user._id == lecture.instructor)
      return next();
    return res.status(401).send("you are not permitted");
  };
};

module.exports = { authorize, authorizeOne };
