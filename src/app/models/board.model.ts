import {TaskColumnModel} from "./task-column.model";

export class BoardModel {
  public name: string;
  public taskColumns: TaskColumnModel[];

  constructor(name, taskColumns) {
    this.name = name ? name : "";
    this.taskColumns = taskColumns ? taskColumns : [];
  }
}
