import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './post.list.component';
import { PostEditComponent } from './post.edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: PostListComponent },
  { path: 'edit/:_id', component: PostEditComponent },
  { path: 'new', component: PostEditComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
