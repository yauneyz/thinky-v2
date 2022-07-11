const mongoose = require("mongoose");

const TabUndoSchema = new mongoose.Schema({
  boards: [String],
  name: String,
  index: Number,
  id: String,
});

module.exports = TabUndoSchema;
