const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: { type: String },
  name: {
    type: String,
    required: true,
  },
  street: { type: String },
  houseNumber: { type: String },
  apartmentNumber: { type: String },
  city: { type: String },
  postalCode: { type: String },
  country: { type: String },
  email: { type: String },
  emailSend: { type: Boolean, default: false },
  phone: { type: String },
  created: {
    type: Date,
    default: Date.now,
  },
  suspend: { type: Boolean, default: false },
  daysOff: { type: [Date] },
});

const Place = mongoose.model("Place", schema);

module.exports = Place;
