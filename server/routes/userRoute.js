const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const config = require("../config");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Place = require("../models/place");

const { verifyJWT } = require("../middleware/verifyJWT");

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  User.findOne({ email }, (err, data) => {
    if (err) {
      res.status(200).json({ success: false, response: "search user error" });
      console.log("search user error", err);
    }
    if (data) {
      res.status(200).json({ success: false, response: "user exists" });
    } else {
      const sanitizeEmail = email.toLowerCase();
      const user = new User({ email:sanitizeEmail, password });
      user.save();
      res.status(201).json({ success: true, response: "user created" });
    }
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const { secret, tokenExp } = config.module;
  console.log(req.body);
  const sanitizeEmail = email.toLowerCase();

  User.findOne(
    { $and: [{ email: sanitizeEmail }, { password }] },
    { name: 1, email: 1 },
    (err, data) => {
      if (err) {
        console.log("login failed", err);
      }
      if (data) {
        const userId = data.id;
        const token = jwt.sign({ userId }, secret, {
          expiresIn: tokenExp,
        });
        res.json({ success: true, response: "user log in", authToken: token });
      } else {
        res.json({ success: false, response: "bad login or password" });
      }
    }
  );
});

router.get("/user", verifyJWT, (req, res) => {
  User.findById(
    req.userId,
    {
      _id: 0,
      name: 1,
      apiKey: 1,
      services: 1,
      timeFrames: 1,
      workers: 1,
      reservations: 1,
    },
    (err, data) => {
      if (err) {
        console.log("find user failed", err);
        res.end();
      }
      if (data) {
        res.json({
          success: true,
          response: "userData fetched",
          userData: data,
          auth: true,
        });
      }
    }
  );
});

module.exports = router;
