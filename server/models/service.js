const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, required: true },
  placeId: { type: mongoose.Schema.ObjectId, required: true },
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  price: { type: Number },
  quanity: { type: Number, default: 1 },
  description: { type: String },
  suspend: { type: Boolean, default: false },
  created: { type: Date, default: Date.now() },
});

const Service = mongoose.model("Service", schema);

module.exports = Service;
