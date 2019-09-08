import {Component, OnInit} from "@angular/core";
import {BoardComponent} from "./board/board.component";

@Component({
  selector: "tc-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public title = "trello-clone";
  public boards: BoardComponent[] = [];

  public ngOnInit(): void {

  }
}
