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
        const task = new TaskModel(line.name, line.description, line.completedTime, line.parent_column, line.index);
        this.tasks.push(task);
      });
      this.tasks.sort((a: TaskModel, b: TaskModel) => {
        return a.index - b.index;
      });
      console.log("tasks", this.tasks);
    }).catch((e) => {
      console.error("fetching tasks error", e);
    });
  }

  private handleTaskDrag(dragData: any): void {
    const oldIndex = dragData.oldIndex; // where dragged item used to be 0
    const newIndex = dragData.newIndex; // where dragged item is now 1

    const draggedTitle = this.tasks[newIndex].title; // dragged item title
    const switchedTitle = this.tasks[oldIndex].title; // item that got switched title

    console.log("title, index", draggedTitle, newIndex);
    this.tcs.doOperation(Operation.UPDATE_TASK_ORDER, [draggedTitle, newIndex]).then((res) => {
      console.log("success1", res);
    }).catch((e) => {
      console.error("Task1 reorder error", e);
    });

    console.log("title, index", switchedTitle, oldIndex);
    this.tcs.doOperation(Operation.UPDATE_TASK_ORDER, [switchedTitle, oldIndex]).then((res) => {
      console.log("success2", res);
    }).catch((e) => {
      console.error("Task2 reorder error", e);
    });

    console.log("updated tasks", this.tasks);
  }
}
