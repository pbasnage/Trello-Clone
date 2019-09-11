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
      console.log("onTaskColumnEnd", dragData);
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
        const taskColumn = new TaskColumnModel(line.name, line.parent_board);
        this.taskColumns.push(taskColumn);
      });
    }).catch((e) => {
      console.error("get task columns error", e);
    });
  }
}
