import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagListComponent } from './tag.list.component';
import { TagEditComponent } from './tag.edit.component';
import {TagPostListComponent} from "./tag.post.list.component";

const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: TagListComponent },
  { path: 'edit/:_id', component: TagEditComponent },
  { path: 'new', component: TagEditComponent },
  { path: ':_id/post', component: TagPostListComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
