const mongoose = require("mongoose");
const BoardSchema = require("./BoardModel");

const AxisUndoSchema = new mongoose.Schema({
  board: BoardSchema,
  coord: [Number],
  parentId: String,
  id: String,
});

module.exports = AxisUndoSchema;
