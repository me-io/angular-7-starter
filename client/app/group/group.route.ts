import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupComponent } from './group.component';

const routes: Routes = [
  { path: '', component: GroupComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
