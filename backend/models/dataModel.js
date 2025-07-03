const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  pace: {
    type: Number,
    required: true,
    min: 1,
    max: 99
  },
  dribbling: {
    type: Number,
    required: true,
    min: 1,
    max: 99
  },
  shooting: {
    type: Number,
    required: true,
    min: 1,
    max: 99
  },
  defending: {
    type: Number,
    required: true,
    min: 1,
    max: 99
  },
  passing: {
    type: Number,
    required: true,
    min: 1,
    max: 99
  },
  physicality: {
    type: Number,
    required: true,
    min: 1,
    max: 99
  },
  overall: {
    type: Number,
    required: true,
    min: 1,
    max: 99
  },
  image: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
