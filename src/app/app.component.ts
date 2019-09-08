import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
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

  constructor(
    public router: Router,
  ) {
  }

  public ngOnInit(): void {
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
}
