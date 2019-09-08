import {TaskModel} from "./task.model";
import {BoardModel} from "./board.model";

export class TaskColumnModel {
  public name: string;
  public tasks: TaskModel[];
  public parentBoard: BoardModel;

  constructor(name, tasks, parentBoard) {
    this.name = !!name ? name : "";
    this.tasks = !!tasks ? tasks : [];
    this.parentBoard = !!parentBoard ? parentBoard : null;
  }
}
