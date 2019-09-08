import {Component, OnInit} from "@angular/core";
import {TaskColumnComponent} from "../task-column/task-column.component";

@Component({
  selector: "tc-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"]
})
export class BoardComponent implements OnInit {

  public name = "";
  public taskColumns: TaskColumnComponent[] = [];

  public ngOnInit(): void {

  }
}
