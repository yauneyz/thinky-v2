const mongoose = require("mongoose");
const BoardSchema = require("./BoardModel");

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  email: { type: String, required: true },
  boards: BoardSchema,
  open: [[Number]],
  trail: [Number],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
