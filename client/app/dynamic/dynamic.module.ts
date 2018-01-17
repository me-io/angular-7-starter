import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppHtmlOutletDirective } from './directive/html-outlet.directive';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  exports: [
    // Shared Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
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
