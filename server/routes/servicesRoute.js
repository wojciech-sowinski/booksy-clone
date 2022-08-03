const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const config = require("../config");
const jwt = require("jsonwebtoken");

const Service = require("../models/service");

const { verifyJWT } = require("../middleware/verifyJWT");

router.post("/services", verifyJWT, (req, res) => {

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
      Service.find({userId},{userId:0},(err,data)=>{
        if(err){
          console.log('services find failed',err);
          res.status(404).json({
            result: "save failed",
          })}
          else{
            if(data){
              res.status(200).json({services:data,result:true})
            }
          }
          
        }
      )
    }
  });
});

router.put("/services", verifyJWT, (req, res) => {

  const userId = req.userId;
  const serviceId=req.body._id
  
  const serviceData = { ...req.body};
  Service.findByIdAndUpdate({_id:serviceId},serviceData,(err,data)=>{
    if(err){
      console.log('service update failed',err)
      res.json({result:'update failed'})
    }else{
      if(data){
        console.log(data);
        
        res.json({result:'service updated'})
      }
    }
  })
 
 
});


router.get('/services',verifyJWT,(req,res)=>{

  const userId = req.userId;


  Service.find({userId},{userId:0},(err,data)=>{
    if(err){
      console.log('services find failed',err);
      res.status(404).json({
        result: "save failed",
      })}
      else{
        if(data){
          res.status(200).json({services:data,result:true})
        }
      }
      
    }
  )

})


router.delete("/services", verifyJWT, (req, res) => {
  const userId = req.userId;
  const _id = req.body.serviceId;

  Service.findOneAndDelete({userId,_id},(err,data)=>{
    if(err){
      console.log('service delete failed',err);
      res.json({result:'delete failed'})
      
    }else{
      if(data){
        res.json({result:'servise deleted'})
      }else{
        res.end()
      }
    }
  })


  
})

module.exports = router;
