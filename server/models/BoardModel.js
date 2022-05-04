const mongoose = require("mongoose");

let BoardSchema = new mongoose.Schema({
  name: String,
  text: String,
});
BoardSchema.add({ children: [BoardSchema] });

module.exports = BoardSchema;
