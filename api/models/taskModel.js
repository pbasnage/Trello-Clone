'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Enter the name of the task'
  },
  completed_time: {
    type: String,
    default: 'incomplete'
  },
  parent_column: {
    type: String,
  },
  description: {
    type: String,
    default: 'Enter description'
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);
module.exports = TaskSchema;
