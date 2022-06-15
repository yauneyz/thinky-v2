const mongoose = require("mongoose");

let BoardSchema = new mongoose.Schema({
  name: String,
  text: String,
  expanded: {
    type: Boolean,
    default: false,
  },
});
BoardSchema.add({ children: [BoardSchema] });

module.exports = BoardSchema;
