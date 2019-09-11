const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  TaskSchema = require('./api/models/taskModel'),
  TaskColumnSchema = require('./api/models/taskColumnModel'),
  BoardSchema = require('./api/models/boardModel'),
  bodyParser = require('body-parser');

const Task = mongoose.model('Task', TaskSchema);
const TaskColumn = mongoose.model('TaskColumn', TaskColumnSchema);
const Board = mongoose.model('Board', BoardSchema);

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/trelloCloneDB').then((connection) => {

  /**
   * Clear Database and manually enter some task, taskColumn, and board instances
   */
  initializeData();

}).catch(e => {
  console.error("trello clone db connection error", e);
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const routes = require('./api/routes/trelloCloneRoutes'); //importing route
routes(app); //register the route


app.listen(port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


console.log('Trello Clone RESTful API server started on: ' + port);

function initializeData() {
  // Clear our db when starting up
  Task.remove({}).catch((e) => {
    console.error("error clearing Task Collection");
  });
  TaskColumn.remove({}).catch((e) => {
    console.error("error clearing Task Collection");
  });
  Board.remove({}).catch((e) => {
    console.error("error clearing Task Collection");
  });

  /**
   * Manually setting up a default scenario.
   * Upon server start up, we should have 3 Boards
   */
  for (let i = 1; i <= 3; i++) {
    const board = new Board({
      name: 'Board ' + i,
    });
    board.save((err, board) => {
      // board saved
    });
  }

  /**
   * 4 columns in Board 1, 5 in the Board 2, and 6 in Board 3.
   */
  for (let i = 1; i <= 15; i++) {
    let parentBoard = 'Board 1';
    let index = 0;
    if (i > 9) {
      index = 0;
      parentBoard = 'Board 3';
    } else if (i > 4) {
      index = 0;
      parentBoard = 'Board 2';
    }
    const taskColumn = new TaskColumn({
      name: 'Task Column ' + i,
      parent_board: parentBoard,
      index: index,
    });
    taskColumn.save((err, board) => {
    });
    index++;
  }

  /**
   * Initialize with 3 tasks in every column
   */
  for (let i = 1; i <= 45; i++) {
    const parentColumn = 'Task Column ' + (Math.ceil(i / 3));
    const task = new Task({
      name: 'Task ' + i,
      completedTime: 'incomplete',
      parentColumn: parentColumn,
      description: 'Description for task number ' + i,
      index: ((i - 1) % 3),
    });
    task.save((err, task) => {
    });
  }
}
