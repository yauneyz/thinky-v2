const mongoose = require("mongoose");

let BoardSchema = new mongoose.Schema({
  title: String,
  text: String,
  expanded: {
    type: Boolean,
    default: false,
  },
  id: String,
  parentId: String,
  children: [String],
});

module.exports = BoardSchema;
