import {BoardModel} from "./board.model";

export class TaskColumnModel {
  public name: string;
  public parentBoard: BoardModel;
  public index: number;

  constructor(name, parentBoard, index) {
    this.name = !!name ? name : "";
    this.parentBoard = !!parentBoard ? parentBoard : null;
    this.index = index !== undefined ? index : null;
  }
}
