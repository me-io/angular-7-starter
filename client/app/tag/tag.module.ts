import {NgModule} from '@angular/core';
import {TagService} from './services/tag.service';
import {SharedModule} from '../shared/shared.module';
import {routing} from './tag.route';
import {AuthInterceptor} from '../util/interceptor/auth.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TagListComponent} from './tag.list.component';
import {TagEditComponent} from './tag.edit.component';
import {TagPostListComponent} from "./tag.post.list.component";

@NgModule({
  declarations: [
    TagListComponent,
    TagEditComponent,
    TagPostListComponent
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
