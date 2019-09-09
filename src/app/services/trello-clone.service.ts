import {Injectable} from "@angular/core";

@Injectable()
export class TrelloCloneService {

  /**
   * Only allow drag operations across bags of the same type
   * @param dragData - the information passed from the bad
   */
  public handleMoveEvent(dragData: any): boolean {
    return dragData.from.className === dragData.to.className;
  }
}
