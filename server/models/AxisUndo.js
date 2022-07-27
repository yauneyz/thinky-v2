const mongoose = require("mongoose");
const BoardSchema = require("./BoardModel");

const AxisUndoSchema = new mongoose.Schema({
  board: BoardSchema,
  id: String,
});

module.exports = AxisUndoSchema;
