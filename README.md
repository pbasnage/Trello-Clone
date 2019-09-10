# TrelloClone

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `brew services start mongodb-community@3.2` to start the mongo database.
Run `node server.js` to start the the local server.

Close all instances of Chrome and open Chrome on another tab using
`open -a /Applications/Google\ Chrome.app --args --disable-web-security --user-data-dir`
This turns off the CORS policy that normally would block our requests from reaching our local server.

In a new terminal tab, run `npm start` to build the Angular project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
