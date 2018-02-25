import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostListComponent} from './post.list.component';
import {PostEditComponent} from './post.edit.component';
import {PostViewComponent} from "./post.view.component";

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: PostListComponent},
  {path: 'edit/:_id', component: PostEditComponent},
  {path: 'view/:_id', component: PostViewComponent},
  {path: 'new', component: PostEditComponent},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
