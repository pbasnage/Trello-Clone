import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BoardModel} from "./models/board.model";
import {Operation, TrelloCloneService} from "./services/trello-clone.service";

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

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private tcs: TrelloCloneService,
  ) {
  }

  public ngOnInit(): void {

    this.tcs.doOperation(Operation.GET_BOARDS).then((boards: any) => {
      boards.forEach((board) => {
        this.boards.push(board);
      });
    }).catch((e) => {
      console.error("GET Boards error", e);
    });

    this.routeSub = this.route.params.subscribe((params: Params) => {
      if (params.boardName) {
        this.currentRoute = "boards";
      } else {
        this.currentRoute = "";
      }
    });
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
}
