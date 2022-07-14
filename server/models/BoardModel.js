const mongoose = require("mongoose");

let BoardSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  text: String,
  expanded: {
    type: Boolean,
    default: false,
  },
  id: String,
  parentId: String,
});
BoardSchema.add({ children: [BoardSchema] });

module.exports = BoardSchema;
