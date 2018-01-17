import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHtmlOutletDirective } from './directive/html-outlet.directive';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../util/interceptor/auth.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    // Shared Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Shared Components
    AppHtmlOutletDirective,
  ],
  declarations: [
    AppHtmlOutletDirective,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

  ],
})
export class DynamicModule {
}
