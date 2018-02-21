import {NgModule} from '@angular/core';
import {PostService} from './services/post.service';
import {SharedModule} from '../shared/shared.module';
import {routing} from './post.route';
import {AuthInterceptor} from '../util/interceptor/auth.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {PostListComponent} from './post.list.component';
import {PostEditComponent} from './post.edit.component';
import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";
import { PostViewComponent } from './post.view.component';

@NgModule({
  declarations: [
    PostListComponent,
    PostEditComponent,
    PostViewComponent,
  ],
  imports: [
    routing,
    SharedModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [
    PostService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [],
})

export class PostModule {
}
