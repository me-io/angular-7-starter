import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './about/about.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'about', component: AboutComponent},
  {path: 'tag', loadChildren: './tag/tag.module#TagModule'},
  {path: 'post', loadChildren: './post/post.module#PostModule'},
  {path: 'account', loadChildren: './account/account.module#AccountModule'},
  {path: 'notfound', component: NotFoundComponent},
  {path: '**', redirectTo: '/notfound'},
];


export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
