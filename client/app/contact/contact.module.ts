import { NgModule } from '@angular/core';
import { ContactComponent } from './contact.component';
import { ContactService } from './services/contact.service';
import { SharedModule } from '../shared/shared.module';
import { routing } from './contact.route';
import { AuthInterceptor } from '../util/interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    ContactComponent,
  ],
  imports: [
    routing,
    SharedModule,
  ],
  providers: [
    ContactService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [
    ContactComponent,
  ],
})

export class ContactModule {
}
