const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema({
  name: String,
  data: String,
});

const IdeaSchema = new mongoose.Schema({
	data: String,
});


const BoardSchema = new mongoose.Schema({
  name: String,
  columns: [ColumnSchema],
  ideas: [IdeaSchema],
});

module.exports = BoardSchema;
