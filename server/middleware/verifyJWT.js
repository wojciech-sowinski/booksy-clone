const jwt = require("jsonwebtoken");
const config = require("../config");

const verifyJWT = (req, res, next) => {
  const { secret } = config.module;

  const token = req.headers["x-access-token"];

  if (!token) {
    res.status(401).json({ auth: false, response: "no token" });
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ auth: false, response: err });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  }
};

exports.verifyJWT = verifyJWT;
