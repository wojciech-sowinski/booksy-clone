const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const config = require("../config");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Place = require("../models/place");
const ObjectId = require('mongodb').ObjectID

const { verifyJWT } = require("../middleware/verifyJWT");

router.post("/places", verifyJWT, (req, res) => {
  const place = new Place({ userId: req.userId, ...req.body });
  place.save((err, result) => {
    if (err) {
      console.log("place save failed", err);
      res.status(200).json({ response: "Place save failed" });
    } else {
      Place.find({ userId: req.userId }, { userId: 0 }, (err, data) => {
        if (err) {
          console.log("Find places failed", err);
          res
            .status(200)
            .json({
              succes: false,
              response: "Find places failed",
              places: [],
            });
        } else {
          if(data){
            res.status(201).json({ success: true, places: data });
          }
        }
      });
    }
  });
});

router.get("/places", verifyJWT, (req, res) => {
  Place.find({ userId: req.userId }, { userId: 0 }, (err, data) => {
    if (err) {
      console.log("Find places failed", err);
      res.json({ success: false,places:[] });
    } else {
      res.json({ success: true, places: data });
    }
  });
});

router.put("/places", verifyJWT, (req, res) => {
  const placeId = req.body._id;
  Place.findByIdAndUpdate({ _id: placeId }, { ...req.body }, (err, data) => {
    if (err) {
      console.log("Place update failed", err);
      res.json({ result: false });
    } else {
      Place.find({ userId: req.userId }, { userId: 0 }, (err, data) => {
        if (err) {
          console.log("Find places failed", err);
          res.json({ success: false,places:[] });
        } else {
          res.json({success:true,places:data});
        }
      });
    }
  });
});

router.delete("/places", verifyJWT, (req, res) => {
  const userId = req.userId;
  const placeId = req.body._id;

  Place.deleteOne({ $and: [{ userId }, { _id: placeId }] }, (err, data) => {
    if (err) {
      console.log("Place delete is failed", err);
      res.json({ result: false });
    } else {
      Place.find({ userId: req.userId }, { userId: 0 }, (err, data) => {
        if (err) {
          console.log("Find places failed", err);
          res.json({ success: false ,places:[]});
        } else {
          console.log("data from find", data);
          res.json({success:true,places:data});
        }
      });
    }
  });
});


router.get('/pplace',(req,res)=>{
  
  const placeId = req.query.activePlace

  Place.findById(ObjectId(placeId),({_id:0,userId:0,emailSend:0,created:0,daysOff:0}),(err,data)=>{
    if(err){
      console.log("PPlace find is failed", err);
      res.json({ result: false });
      
    }else{
      
      res.json({ success: true, place: data });
    }
  })
  

})

module.exports = router;
