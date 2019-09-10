import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BoardModel} from './models/board.model';
import {Operation, TrelloCloneService} from './services/trello-clone.service';

@Component({
  selector: "tc-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public title = "trello-clone";
  public boards: BoardModel[] = [];
  public currentRoute: string;
  public currentBoard: BoardModel;
  private routeSub: any;
  private changeRef: ChangeDetectorRef;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private tcs: TrelloCloneService,
  ) {
  }

  public ngOnInit(): void {

    this.tcs.doOperation(Operation.GET_TASKS).then((tasks) => {
      console.log("tasks", tasks);
    }).catch((e) => {
      console.error("GET Tasks error", e);
    });

    this.routeSub = this.route.params.subscribe((params: Params) => {
      if (params.boardName) {
        this.currentRoute = "boards";
      } else {
        this.currentRoute = "";
      }
    });

    for (let i = 0; i < 10; i++) {
      const testBoard = new BoardModel("My Board " + i, []);
      this.boards.push(testBoard);
    }
  }

  public navToHome(): void {
    this.router.navigateByUrl("/").catch((e) => {
      console.error("navigate to home error", e);
    });
  }

  public goToBoard(board: BoardModel): void {
    this.router.navigateByUrl("/boards/" + board.name).catch((e) => {
      console.error("Navigate to board name " + board.name + " error", e);
    });
  }

  private initBoards(): void {

  }
}
