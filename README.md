# TrelloClone

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.2.

This project contains basic CRUD APIs for boards, task columns, and tasks, and displays them on an
Angular-based UI to be similar to Trello. Currently, the UI allows you to reorder tasks
within a column, and columns within a board, and to complete tasks with a timestamp—these
changes persist to the mongo database.


This project uses node.js (and Express.js) to communicate between an Angular8 frontend and a mongo database
(with Mongoose). The frontend uses Sortable to help drag and
drop the elements.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

To run this on your own machine, clone the repo and navigate to the root folder. The following testing instructions are for OSX users.

Ensure you have brew, mongodb, and node installed on your machine.

Run `brew services start mongodb-community@3.2` to start the mongo database. 

Run `node server.js` to start the the local server.
The server should be listening on the 3000 port.

Close all instances of Chrome and open Chrome on another tab using
`open -a /Applications/Google\ Chrome.app --args --disable-web-security --user-data-dir`
This turns off the CORS policy that normally would block our requests from reaching our local server.
Don't use this tab for anything except for locally testing this app!

In a new (3rd) terminal tab, run `npm start` to build the Angular project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
The project should be running on the 4200 port.
