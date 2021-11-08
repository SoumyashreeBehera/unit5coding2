const authorize = (given) => {
  return function (req, res, next) {
    const user = req.user;
    const isPermitted = given.includes(user.roles);
    if (!isPermitted) return res.status(401).send("you are not permitted");
    return next();
  };
};

module.exports = authorize;
