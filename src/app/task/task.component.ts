import {Component, Input, OnInit} from "@angular/core";
import {TaskModel} from "../models/task.model";

@Component({
  selector: "tc-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"]
})
export class TaskComponent implements OnInit {
  @Input() task: TaskModel;

  public ngOnInit(): void {

  }

  public completeTask(): void {
    const today = new Date();
    const localeDate = today.toLocaleDateString();
    const localTime = today.toLocaleTimeString();

    this.task.completionTime = localeDate + " " + localTime;
  }
}
