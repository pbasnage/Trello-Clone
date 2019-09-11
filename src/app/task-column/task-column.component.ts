import {Component, Input, OnInit} from "@angular/core";
import {BoardModel} from "../models/board.model";
import {TaskColumnModel} from "../models/task-column.model";
import {TaskModel} from "../models/task.model";
import {Operation, TrelloCloneService} from "../services/trello-clone.service";

@Component({
  selector: "tc-task-column",
  templateUrl: "./task-column.component.html",
  styleUrls: ["./task-column.component.scss"]
})
export class TaskColumnComponent implements OnInit {

  @Input() board: BoardModel;
  @Input() taskColumn: TaskColumnModel;

  public tasks: TaskModel[] = [];

  public taskColumnSortableOptions: any = {
    group: {
      name: "task-bag",
    },
    onMove: ((moveData: any) => {
      return this.tcs.handleMoveEvent(moveData);
    }),
    onEnd: ((dragData: any) => {
      console.log("onTaskEnd", dragData);
    }),
  };

  constructor(
    private tcs: TrelloCloneService,
  ) {
  }

  public ngOnInit(): void {
    if (this.board) {
      this.taskColumn.parentBoard = this.board;
    }

    this.tcs.doOperation(Operation.GET_TASKS, [this.taskColumn.name]).then((lines: any) => {
      lines.forEach((line) => {
        const task = new TaskModel(line.name, line.description, line.completedTime, line.parent_column);
        this.tasks.push(task);
      });
    }).catch((e) => {
      console.error("fetching tasks error", e);
    });
  }
}
