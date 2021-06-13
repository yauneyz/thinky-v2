const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema({
  name: String,
  data: String,
});


const BoardSchema = new mongoose.Schema({
  name: String,
  columns: [ColumnSchema],
  ideas: [String],
});

module.exports = BoardSchema;
