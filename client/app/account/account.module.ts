import { NgModule } from '@angular/core';
import { AccountComponent } from './account.component';
import { SharedModule } from '../shared/shared.module';
import { routing } from './account.route';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminComponent } from './admin/admin.component';
import { AuthInterceptor } from '../util/interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AccountComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AdminComponent,
  ],
  imports: [
    routing,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [
    AccountComponent,
  ],
})

export class AccountModule {
}
