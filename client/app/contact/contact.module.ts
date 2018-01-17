import { NgModule } from '@angular/core';
import { ContactComponent } from './contact.component';
import { ContactService } from './services/contact.service';
import { SharedModule } from '../shared/shared.module';
import { routing } from './contact.route';

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
  ],
  exports: [
    ContactComponent,
  ],
})

export class ContactModule {
}
