import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagListComponent } from './tag.list.component';
import { TagEditComponent } from './tag.edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: TagListComponent },
  { path: 'edit/:_id', component: TagEditComponent },
  { path: 'new', component: TagEditComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
