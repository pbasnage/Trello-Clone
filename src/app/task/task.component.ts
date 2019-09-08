import {Component, OnInit} from "@angular/core";

@Component({
  selector: "tc-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"]
})
export class TaskComponent implements OnInit {
  public board = null;

  public ngOnInit(): void {

  }
}
