const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const config = require("../config");
const jwt = require("jsonwebtoken");

const Service = require("../models/service");

const { verifyJWT } = require("../middleware/verifyJWT");

router.post("/services", verifyJWT, (req, res) => {
  console.log(req.body);
  const userId = req.userId;
  
  const serviceData = { ...req.body, userId };

  const service = new Service({ ...serviceData });
  service.save((err, data) => {
    if (err) {
      console.log("save service failed", err);
      res.json({
        result: "save failed",
      });
    }
    if (data) {
      console.log(data);
      // res.status(201).json({
      //     result:'service added',
      //     services:
      // })
      res.end();
    }
  });
});

module.exports = router;
