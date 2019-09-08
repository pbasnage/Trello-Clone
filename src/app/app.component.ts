import {Component, OnInit} from "@angular/core";
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

  public ngOnInit(): void {
    const testBoard = new BoardModel("Main Board", []);
    this.boards.push(testBoard);
  }
}
