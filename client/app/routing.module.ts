import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'contact', loadChildren: './contact/contact.module#ContactModule' },
  { path: 'account', loadChildren: './account/account.module#AccountModule' },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];


export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
