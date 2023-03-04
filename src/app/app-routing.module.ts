import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { LinksComponent } from "./links/links.component";
import { EntryComponent } from "./entry/entry.component";
import {ErrorComponent} from "./error/error.component";

const routes: Routes = [
  { path: '', redirectTo: '/entry', pathMatch: 'full' },
  { path: 'links', component: LinksComponent },
  { path: 'entry', component: EntryComponent },
  { path: 'error', component: ErrorComponent}
];


@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
