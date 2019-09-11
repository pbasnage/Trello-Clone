import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {BoardModel} from "../models/board.model";
import {TaskColumnModel} from "../models/task-column.model";
import {Operation, TrelloCloneService} from "../services/trello-clone.service";

@Component({
  selector: "tc-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"]
})
export class BoardComponent implements OnInit {

  @Input() board: BoardModel;

  public name = "";
  public taskColumns: TaskColumnModel[] = [];
  private routeSub: any;

  public boardSortableOptions: any = {
    group: {
      name: "task-bag",
    },
    onEnd: ((dragData: any) => {
      this.handleTaskColumnDrag(dragData);
    }),
    onMove: ((moveData: any) => {
      return this.tcs.handleMoveEvent(moveData);
    }),
    scrollSensitivity: 180,
  };

  constructor(
    public route: ActivatedRoute,
    private tcs: TrelloCloneService,
  ) {
  }

  public ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      if (!this.board && params.boardName) {
        this.name = params.boardName;
      } else if (this.board) {
        this.name = this.board.name;
      }
    });

    this.taskColumns = [];

    if (!this.board) {
      this.tcs.doOperation(Operation.GET_BOARDS, [this.name]).then((response) => {
        this.board = new BoardModel(response[0].name);
      }).catch((e) => {
        console.error("get board error", e);
      });
    }

    this.tcs.doOperation(Operation.GET_TASK_COLUMNS, [this.name]).then((lines: any) => {
      lines.forEach((line) => {
        const taskColumn = new TaskColumnModel(line.name, line.parent_board, line.index);
        this.taskColumns.push(taskColumn);
      });
      this.taskColumns.sort((a: TaskColumnModel, b: TaskColumnModel) => {
        return a.index - b.index;
      });
    }).catch((e) => {
      console.error("get task columns error", e);
    });
  }

  private handleTaskColumnDrag(dragData: any): void {
    const oldIndex = dragData.oldIndex; // where dragged item used to be 0
    const newIndex = dragData.newIndex; // where dragged item is now 1

    const draggedTitle = this.taskColumns[newIndex].name; // dragged item title
    const switchedTitle = this.taskColumns[oldIndex].name; // item that got switched title

    console.log("title, index", draggedTitle, newIndex);
    this.tcs.doOperation(Operation.UPDATE_TASK_COLUMN_ORDER, [draggedTitle, newIndex]).then((res) => {
      console.log("success1", res);
    }).catch((e) => {
      console.error("Task1 reorder error", e);
    });

    console.log("title, index", switchedTitle, oldIndex);
    this.tcs.doOperation(Operation.UPDATE_TASK_COLUMN_ORDER, [switchedTitle, oldIndex]).then((res) => {
      console.log("success2", res);
    }).catch((e) => {
      console.error("Task2 reorder error", e);
    });

    console.log("updated tasks", this.taskColumns);
  }

}
