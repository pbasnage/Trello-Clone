'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskColumnSchema = new Schema({
  name: {
    type: String,
    required: 'Enter the name of the task column'
  },
  parent_board: {
    type: String,
    default: ''
  },
  index: {
    type: Number,
  }
});

module.exports = mongoose.model('TaskColumns', TaskColumnSchema);
module.exports = TaskColumnSchema;
