'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Enter the name of the task'
  },
  description: {
    type: String,
    default: 'Enter description'
  },
  parentColumn: {
    type: String,
  },
  completedTime: {
    type: String,
    default: 'incomplete'
  },
  index: {
    type: Number,
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);
module.exports = TaskSchema;
