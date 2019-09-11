import {TaskColumnModel} from "./task-column.model";

export class BoardModel {
  public name: string;
  public taskColumns: TaskColumnModel[];

  constructor(name) {
    this.name = name ? name : "";
  }
}
