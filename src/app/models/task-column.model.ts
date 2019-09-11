import {BoardModel} from "./board.model";

export class TaskColumnModel {
  public name: string;
  public parentBoard: BoardModel;

  constructor(name, parentBoard) {
    this.name = !!name ? name : "";
    this.parentBoard = !!parentBoard ? parentBoard : null;
  }
}
