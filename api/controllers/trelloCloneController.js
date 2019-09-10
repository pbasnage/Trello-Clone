'use strict';

require('../models/taskColumnModel');
require('../models/boardModel');

const mongoose = require('mongoose'),
  Task = mongoose.model('Tasks'),
  TaskColumn = mongoose.model('TaskColumns'),
  Board = mongoose.model('Boards');

/**
 * CRUDs (and list) for boards
 */
exports.list_all_boards = function(req, res) {
  Board.find({}, function(err, board) {
    if (err)
      res.send(err);
    res.json(board);
  });
};

exports.create_a_board = function(req, res) {
  const new_board = new Board(req.body);
  new_board.save(function(err, board) {
    if (err)
      res.send(err);
    res.json(board);
  });
};

exports.read_a_board = function(req, res) {
  Board.findById(req.params.boardId, function(err, board) {
    if (err)
      res.send(err);
    res.json(board);
  });
};

exports.update_a_board = function(req, res) {
  Board.findOneAndUpdate({_id: req.params.boardId}, req.body, {new: true}, function(err, board) {
    if (err)
      res.send(err);
    res.json(board);
  });
};

exports.delete_a_board = function(req, res) {
  Board.remove({
    _id: req.params.boardId
  }, function(err, board) {
    if (err)
      res.send(err);
    res.json({ message: 'board successfully deleted' });
  });
};

/**
 * CRUDs (and list) for taskColumns
 */
exports.list_all_task_columns = function(req, res) {
  TaskColumn.find({}, function(err, taskColumn) {
    if (err)
      res.send(err);
    res.json(taskColumn);
  });
};

exports.create_a_task_column = function(req, res) {
  const new_taskColumn = new TaskColumn(req.body);
  new_taskColumn.save(function(err, taskColumn) {
    if (err)
      res.send(err);
    res.json(taskColumn);
  });
};

exports.read_a_task_column = function(req, res) {
  TaskColumn.findByColumnId(req.params.taskColumnId, function(err, taskColumn) {
    if (err)
      res.send(err);
    res.json(taskColumn);
  });
};

exports.update_a_task_column = function(req, res) {
  TaskColumn.findOneAndUpdate({_id: req.params.taskColumnId}, req.body, {new: true}, function(err, taskColumn) {
    if (err)
      res.send(err);
    res.json(taskColumn);
  });
};

exports.delete_a_task_column = function(req, res) {
  TaskColumn.remove({
    _id: req.params.taskColumnId
  }, function(err, taskColumn) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

/**
 * CRUDs (and list) for tasks
 */
exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_task = function(req, res) {
  const new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.delete_a_task = function(req, res) {
  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
