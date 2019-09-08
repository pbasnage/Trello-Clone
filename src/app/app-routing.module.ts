import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {AppComponent} from "./app.component";
import {BoardComponent} from "./board/board.component";

const routes: Routes = [
  {
    path: "",
    component: AppComponent,
  },
  {
    path: "boards/:idBoard",
    component: BoardComponent,
  },
  {
    path: "**",
    redirectTo: "/",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
