import {Component, EventEmitter, Input, Output, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {SortablejsModule} from "ngx-sortablejs";
import {TaskColumnComponent} from "../task-column/task-column.component";
import {BoardModel} from "../models/board.model";
import {TaskColumnModel} from "../models/task-column.model";
import {TrelloCloneService} from "../services/trello-clone.service";

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
    onStart: ((dragData: any) => {
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

    for (let i = 0; i < 10; i++) {
      const taskColumn = new TaskColumnModel("Task Column " + i, [], this.board);
      this.taskColumns.push(taskColumn);
    }
  }
}
