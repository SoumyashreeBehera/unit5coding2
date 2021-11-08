require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  //check if header is present if not present throw an error
  const bearerToken = req?.headers?.authorization;
  if (!bearerToken) return res.status(401).send("dont have any headers");

  //check for bearer
  if (!bearerToken.startsWith("Bearer "))
    return res.status(401).send("dont have any Bearer");

  const token = bearerToken.split(" ")[1];

  try {
    const user = await verifyToken(token);
    req.user = user.user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, function (err, user) {
      if (err) return reject(err);
      return resolve(user);
    });
  });
};

module.exports = authenticate;
