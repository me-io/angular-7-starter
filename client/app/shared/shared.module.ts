import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastComponent } from './toast/toast.component';
import { LoadingComponent } from './loading/loading.component';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../util/interceptor/auth.interceptor';
import { HeaderComponent } from './page/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './page/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  exports: [
    // Shared Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Shared Components
    HttpClientModule,
    ToastComponent,
    LoadingComponent,
    HeaderComponent,
    FooterComponent,
    ProgressBarComponent,
    TestComponent,
  ],
  declarations: [
    ToastComponent,
    LoadingComponent,
    HeaderComponent,
    FooterComponent,
    ProgressBarComponent,
    TestComponent,
  ],
  providers: [
    ToastComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {
}
