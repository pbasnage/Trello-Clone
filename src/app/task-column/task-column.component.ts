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
      this.handleTaskDrag(dragData);
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
        const task = new TaskModel(line.name, line.description, line.completedTime, line.parentColumn, line.index);
        this.tasks.push(task);
      });
      this.tasks.sort((a: TaskModel, b: TaskModel) => {
        return a.index - b.index;
      });
    }).catch((e) => {
      console.error("fetching tasks error", e);
    });
  }

  private handleTaskDrag(dragData: any): void {
    const oldIndex = dragData.oldIndex; // where dragged item used to be 0
    const newIndex = dragData.newIndex; // where dragged item is now 1

    if (!this.tasks[newIndex] || !this.tasks[oldIndex]) {
      // this is a state where a drag operation is across bags, which currently does not have server-side
      // support.
      return;
    }

    const draggedTitle = this.tasks[newIndex].title; // dragged item title
    const switchedTitle = this.tasks[oldIndex].title; // item that got switched title

    this.tcs.doOperation(Operation.UPDATE_TASK_ORDER, [draggedTitle, newIndex]).then(() => {
    }).catch((e) => {
      console.error("Task1 reorder error", e);
    });

    this.tcs.doOperation(Operation.UPDATE_TASK_ORDER, [switchedTitle, oldIndex]).then(() => {
    }).catch((e) => {
      console.error("Task2 reorder error", e);
    });
  }
}
