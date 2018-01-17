import { NgModule } from '@angular/core';
import { GroupComponent } from './group.component';
import { GroupService } from './services/group.service';
import { SharedModule } from '../shared/shared.module';
import { routing } from './group.route';
import { AuthInterceptor } from '../util/interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    GroupComponent,
  ],
  imports: [
    routing,
    SharedModule,
  ],
  providers: [
    GroupService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [
    GroupComponent,
  ],
})

export class GroupModule {
}
