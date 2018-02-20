import {ApplicationRef, Injector, NgModule, PlatformRef} from '@angular/core';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {routing} from './routing.module';
import {SharedModule} from './shared/shared.module';
import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {AuthGuardLogin} from './services/auth-guard-login.service';
import {AuthGuardAdmin} from './services/auth-guard-admin.service';
import {AppComponent} from './app.component';
import {AboutComponent} from './about/about.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {BrowserModule} from '@angular/platform-browser';
import {DynamicModule} from './dynamic/dynamic.module';
import {environment} from '../environments/environment';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AuthInterceptor} from './util/interceptor/auth.interceptor';
import {AuthGuardSuperAdmin} from './services/auth-guard-super-admin.service';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    routing,
    SharedModule,
    DynamicModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    AuthGuardSuperAdmin,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [
    AppComponent,
  ],
})

export class AppModule {
  /**
   * Allows for retrieving singletons using `AppModule.injector.get(MyService)`
   * (whereas `ReflectiveInjector.resolveAndCreate(MyService)` would create a
   * new instance of the service).
   */
  static injector: Injector;

  constructor(public applicationRef: ApplicationRef,
              platformRef: PlatformRef,
              injector: Injector) {

    // AppModule.injector = injector;
    // const parser: DomSanitizer = injector.get(DomSanitizer);
    //
    //
    // console.log(applicationRef);
    // console.log(platformRef);
    // console.log(parser);
  }

}

