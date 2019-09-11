import {Injectable} from "@angular/core";

export enum Operation {
  UPDATE_TASK_ORDER = "update-task-order",
  UPDATE_TASK_COLUMN_ORDER = "update-task-column-order",
  GET_TASKS = "get-tasks",
  GET_TASK_COLUMNS = "get-task-columns",
  GET_BOARDS = "get-boards",
  COMPLETE_TASK = "complete-task",
}

@Injectable()
export class TrelloCloneService {

  public doOperation(operation: Operation, args = null): Promise<void> {
    let method = "GET";
    let url = "";

    switch (operation) {
      case Operation.UPDATE_TASK_COLUMN_ORDER:
        method = "PUT";
        url = args && args.length > 1 ? "http://localhost:3000/task-columns/" + args[0] + "/" + args[1] : "";
        break;
      case Operation.UPDATE_TASK_ORDER:
        method = "PUT";
        url = args && args.length > 1 ? "http://localhost:3000/tasks/" + args[0] + "/" + args[1] : "";
        break;
      case Operation.GET_BOARDS:
        if (!args) {
          url = "http://localhost:3000/boards";
        } else {
          url = "http://localhost:3000/boards/" + args[0];
        }
        break;
      case Operation.GET_TASK_COLUMNS:
        url = args && args.length > 0 ? "http://localhost:3000/task-columns/" + args[0] : "";
        break;
      case Operation.GET_TASKS:
        if (!args) {
          url = "http://localhost:3000/tasks";
        } else {
          url = args.length > 0 ? "http://localhost:3000/tasks/" + args[0] : "";
        }
        break;
      case Operation.COMPLETE_TASK:
        url = args && args.length > 1 ? "http://localhost:3000/tasks/" + args[0] + "/" + args[1] : "";
        method = "PUT";
        break;
    }
    // Don't continue if we pass an invalid operation, or url has not otherwise been set
    if (!url) {
      return Promise.reject("Invalid Operation Error");
    }

    return new Promise<any>((resolve, reject) => {
      console.log(method, url);
      // Open a new connection
      const request = new XMLHttpRequest();
      request.open(method, url, true);

      request.onload = () => {
        const data = JSON.parse(request.response);

        console.log("data", data);

        if (request.status >= 200 && request.status < 400) {
          resolve(data);
        } else {
          console.error("error ", request.status);
        }
      };

      request.onerror = () => {
        reject("API failure error");
      };

      request.send();
    });
  }

  /**
   * Only allow drag operations across bags of the same type
   * @param dragData - the information passed from the bad
   */
  public handleMoveEvent(dragData: any): boolean {
    return dragData.from.className === dragData.to.className;
  }
}
