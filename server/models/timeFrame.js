const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: { type: String, required: true },
  placeId: { type: String, required: true },
  dayIndex: {
    type: Number,
    required: true,
  },
  start: {
    type: Number,
    required: true,
  },
  end: { type: Number, required: true },
});

const TimeFrame = mongoose.model("TimeFrame", schema);

module.exports = TimeFrame;
