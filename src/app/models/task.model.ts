import {TaskColumnModel} from "./task-column.model";

export class TaskModel {
  public title: string;
  public description: string;
  public completionTime: number;
  public parentColumn: TaskColumnModel;

  constructor(title, description, completionTime, parentColumn) {
    this.title = !!title ? title : "";
    this.description = !!description ? description : "";
    this.completionTime = !!completionTime ? completionTime : -1;
    this.parentColumn = !!parentColumn ? parentColumn : null;
  }
}
