import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ToastComponent } from './toast/toast.component';
import { LoadingComponent } from './loading/loading.component';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

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
    ToastComponent,
    LoadingComponent,
    ProgressBarComponent,
    TestComponent,
  ],
  declarations: [
    ToastComponent,
    LoadingComponent,
    ProgressBarComponent,
    TestComponent,
  ],
  providers: [
    ToastComponent,
  ],
})
export class SharedModule {
}
