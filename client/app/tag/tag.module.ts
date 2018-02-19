import { NgModule } from '@angular/core';
import { TagService } from './services/tag.service';
import { SharedModule } from '../shared/shared.module';
import { routing } from './tag.route';
import { AuthInterceptor } from '../util/interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TagListComponent } from './tag.list.component';
import { TagEditComponent } from './tag.edit.component';

@NgModule({
  declarations: [
    TagListComponent,
    TagEditComponent,
  ],
  imports: [
    routing,
    SharedModule,
  ],
  providers: [
    TagService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [],
})

export class TagModule {
}
