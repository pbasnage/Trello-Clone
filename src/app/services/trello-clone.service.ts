import {Injectable} from "@angular/core";

@Injectable()
export class TrelloCloneService {

  public handleMoveEvent(dragData: any): boolean {
    console.log("drag move event", dragData);
    return true;
  }
}
