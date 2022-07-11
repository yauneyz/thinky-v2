const mongoose = require("mongoose");
const BoardSchema = require("./BoardModel");
const TabUndoSchema = require("./TabUndo");
const AxisUndoSchema = require("./AxisUndo");

const TabSchema = new mongoose.Schema({
  name: String,
  editors: [[Number]],
});

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  email: { type: String, required: true },
  boards: BoardSchema,
  open: Number,
  trail: [Number],
  tabs: [TabSchema],
  topNode: [Number],
  deletedTabs: [TabUndoSchema],
  deletedAxes: [AxisUndoSchema],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
