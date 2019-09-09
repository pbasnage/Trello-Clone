import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BoardComponent} from "./board/board.component";
import {BoardModel} from "./models/board.model";

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
  ) {
  }

  public ngOnInit(): void {
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
}
