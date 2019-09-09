import {Component, Input, OnInit} from "@angular/core";
import {BoardComponent} from "../board/board.component";
import {BoardModel} from "../models/board.model";
import {TaskColumnModel} from "../models/task-column.model";
import {TaskModel} from "../models/task.model";
import {TrelloCloneService} from "../services/trello-clone.service";

@Component({
  selector: "tc-task-column",
  templateUrl: "./task-column.component.html",
  styleUrls: ["./task-column.component.scss"]
})
export class TaskColumnComponent implements OnInit {

  @Input() board: BoardModel;
  @Input() taskColumn: TaskColumnModel;

  public taskColumnSortableOptions: any = {
    group: {
      name: "task-bag",
    },
    onStart: ((dragData: any) => {
    }),
    onMove: ((moveData: any) => {
      return this.tcs.handleMoveEvent(moveData);
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
    if (!this.taskColumn.tasks.length) {
      for (let i = 0; i < 10; i++) {
        const task = new TaskModel("Task " + i, "Description " + i, "", this.taskColumn);
        this.taskColumn.tasks.push(task);
      }
    }
  }
}
