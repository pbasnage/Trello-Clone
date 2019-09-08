import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {BoardComponent} from "./board/board.component";
import {TaskComponent} from "./task/task.component";
import {TaskColumnComponent} from "./task-column/task-column.component";

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TaskColumnComponent,
    TaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
