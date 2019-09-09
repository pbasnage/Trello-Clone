import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {SortablejsModule} from "ngx-sortablejs";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {BoardComponent} from "./board/board.component";
import {TaskComponent} from "./task/task.component";
import {TaskColumnComponent} from "./task-column/task-column.component";
import {TrelloCloneService} from "./services/trello-clone.service";

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TaskColumnComponent,
    TaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SortablejsModule.forRoot({ animation: 150 }),
  ],
  providers: [
    TrelloCloneService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
