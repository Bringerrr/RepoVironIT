const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AtmSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  servicingTime: {
    type: Number,
    required: true
  },
  timeGap: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
});

module.exports = Atm = mongoose.model("atm", AtmSchema);
