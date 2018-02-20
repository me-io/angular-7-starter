import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AccountComponent} from './account.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {AuthGuardLogin} from '../services/auth-guard-login.service';
import {AuthGuardAdmin} from '../services/auth-guard-admin.service';
import {AdminComponent} from './admin/admin.component';
import {PasswordComponent} from "./password.component";

const routes: Routes = [
  {path: '', component: AccountComponent},
  {path: 'profile', component: AccountComponent},
  {path: 'password', component: PasswordComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin]},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
