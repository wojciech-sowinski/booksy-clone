const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  
  placeId:{
    type: mongoose.Schema.ObjectId,
    required: true,},
  serviceId:{
    type: mongoose.Schema.ObjectId,
    required: true,},
serviceDate:{type:Date,
    required: true,},
serviceStart:{type:Number,
    required: true,},
serviceEnd:{type:Number,
    required: true,},
  clientFirstName:{
    type:String,
    required: true,}, 
  clientLastName:{
    type:String,
    required: true,}, 
  email: { 
    type: String ,
    required: true,},  
  dayOfWeek:{      
      type:Number,
      required:true},
  created: {
    type: Date,
    default: Date.now,
  },
  
});

const Reservation = mongoose.model("Reservation", schema);

module.exports = Reservation;
