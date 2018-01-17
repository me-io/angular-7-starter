import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactComponent } from './contact.component';

const routes: Routes = [
  { path: '', component: ContactComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
