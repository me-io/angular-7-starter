import { NgModule } from '@angular/core';
import { GroupComponent } from './group.component';
import { GroupService } from './services/group.service';
import { SharedModule } from '../shared/shared.module';
import { routing } from './group.route';

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
  ],
  exports: [
    GroupComponent,
  ],
})

export class GroupModule {
}
