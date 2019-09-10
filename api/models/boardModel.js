'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  name: {
    type: String,
    required: 'Enter the name of the board'
  }
});

module.exports = mongoose.model('Boards', BoardSchema);
module.exports = BoardSchema;
