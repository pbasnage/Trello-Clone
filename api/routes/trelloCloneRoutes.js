'use strict';
module.exports = function(app) {
  const routeList = require('../controllers/trelloCloneController');

  // Board Routes
  app.route('/boards')
    .get(routeList.list_all_boards)
    .post(routeList.create_a_board);

  app.route('/boards/:boardId')
    .get(routeList.read_a_board)
    .put(routeList.update_a_board)
    .delete(routeList.delete_a_board);

  // Task Column Routes
  app.route('/task-columns')
    .get(routeList.list_all_task_columns)
    .post(routeList.create_a_task_column);

  app.route('/task-columns/:taskColumnId')
    .get(routeList.read_a_task_column)
    .put(routeList.update_a_task_column)
    .delete(routeList.delete_a_task_column);

  // Task Routes
  app.route('/tasks')
    .get(routeList.list_all_tasks)
    .post(routeList.create_a_task);

  app.route('/tasks/:taskId')
    .get(routeList.read_a_task)
    .put(routeList.update_a_task)
    .delete(routeList.delete_a_task);
};
