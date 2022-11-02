const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const config = require("../config");
const jwt = require("jsonwebtoken");
const TimeFrame = require("../models/timeFrame");

const { verifyJWT } = require("../middleware/verifyJWT");
const { resolve } = require("path");

router.post("/frames", verifyJWT, (req, res) => {
  const { userId } = req;
  const { dayIndex, start, end, placeId } = req.body;
  const frameStart = start;
  const frameEnd = end;

  TimeFrame.find(
    {
      $and: [
        { userId },
        { dayIndex },
        { placeId },
        {
          $or: [
            { $and: [{ start: { $lt: start } }, { end: { $gt: start } }] },
            { $and: [{ start: { $lt: end } }, { end: { $gt: end } }] },
            { $and: [{ start: { $gt: start } }, { end: { $lt: end } }] },
            { $and: [{ start: { $lt: start } }, { end: { $gt: end } }] },
          ],
        },
      ],
    },
    (err, data) => {
      
      if (err) {
        res.json({ success: false, result: "search failed" });
      } else {
        if (data.length) {
          res.json({
            success: false,
            result: "collides",
          });
        } else {
          const timeFrame = new TimeFrame({
            userId,
            dayIndex,
            start,
            end,
            placeId,
          });
          timeFrame.save((err, data) => {
            if (err) {
              console.log("save failed", err);
            } else {
              TimeFrame.find({ userId }, { userId: 0 }, (err, data) => {
                if (err) {
                  console.log("find frames failed");
                  res.json({
                    success: false,
                    result: "find frames failed",
                  });
                } else {
                  if (data) {
                    res.json({ success: true, result: "time frame added", timeFrames: data });
                  }
                }
              });
            }
          });
        }
      }
    }
  );
});

router.get("/frames", verifyJWT, (req, res) => {
  const { userId } = req;
  TimeFrame.find({ userId }, { userId: 0 }, (err, data) => {
    if (err) {
      console.log("find frames failed");
      res.json({
        success: false,
        result: "find frames failed",
      });
    } else {
      if (data) {
        res.json({ success: true, result: "", timeFrames: data });
      }
    }
  });
});

router.delete("/frames", verifyJWT, (req, res) => {
  const userId = req.userId;
  const _id = req.body.frameId;
 
  TimeFrame.deleteOne(
    { $and: [{ userId }, { _id }] },
    { userId: 0 },
    (err, data) => {
      if (err) {
        console.log("time frame del failed");
        res.json({
          success: false,
          result: "frame del failed",
        });
      } else {
        if (data) {
          TimeFrame.find({ userId }, (err, data) => {
            if (err) {
              console.log("find frames failed");
              res.json({
                success: false,
                result: "find frames failed",
              });
            } else {
              if (data) {
                res.json({ success: true, result: "", timeFrames: data });
              }
            }
          });
        }
      }
    }
  );
});

module.exports = router;
