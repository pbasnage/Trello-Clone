import {Component, Input, OnInit} from "@angular/core";
import {TaskModel} from "../models/task.model";
import {Operation, TrelloCloneService} from "../services/trello-clone.service";

@Component({
  selector: "tc-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"]
})
export class TaskComponent implements OnInit {
  @Input() task: TaskModel;
  public userFriendlyDate: string = null;

  constructor(
    private tcs: TrelloCloneService,
  ) {
  }

  public ngOnInit(): void {
    this.checkForDateConversion();
  }

  public completeTask(): void {
    const today = new Date();
    const storedTime = String(today.getTime());

    this.task.completedTime = storedTime;

    this.tcs.doOperation(Operation.COMPLETE_TASK, [this.task.title, storedTime]).then(() => {
      this.checkForDateConversion();
    }).catch((e) => {
      console.error("Complete task error", e);
    });
  }

  private checkForDateConversion(): void {
    if (this.task.completedTime !== "incomplete") {
      const date = new Date(Number(this.task.completedTime));
      const localeDate = date.toLocaleDateString();
      const localTime = date.toLocaleTimeString();
      this.userFriendlyDate = localeDate + " " + localTime;
    }
  }
}
