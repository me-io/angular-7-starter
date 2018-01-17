import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHtmlOutletDirective } from './directive/html-outlet.directive';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
  providers: [],
})
export class DynamicModule {
}
