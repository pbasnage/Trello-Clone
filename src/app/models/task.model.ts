import {TaskColumnModel} from "./task-column.model";

export class TaskModel {
  public title: string;
  public description: string;
  public completedTime: string;
  public parentColumn: TaskColumnModel;
  public index: number;

  constructor(title, description, completedTime, parentColumn, index) {
    this.title = !!title ? title : "";
    this.description = !!description ? description : "";
    this.completedTime = !!completedTime ? completedTime : "";
    this.parentColumn = !!parentColumn ? parentColumn : null;
    this.index = index !== undefined ? index : null;
  }
}
