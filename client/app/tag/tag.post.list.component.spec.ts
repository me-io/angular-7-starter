import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TagPostListComponent} from './tag.post.list.component';
import {APP_BASE_HREF} from "@angular/common";
import {PasswordComponent} from "../account/password.component";
import {AboutComponent} from "../about/about.component";
import {AccountComponent} from "../account/account.component";
import {LogoutComponent} from "../account/logout/logout.component";
import {AdminComponent} from "../account/admin/admin.component";
import {LoginComponent} from "../account/login/login.component";
import {RouterTestingModule} from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {NotFoundComponent} from "../not-found/not-found.component";
import {SharedModule} from "../shared/shared.module";
import {RegisterComponent} from "../account/register/register.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {TagService} from "./services/tag.service";
import {routing} from "./tag.route";
import {TagListComponent} from "./tag.list.component";
import {TagEditComponent} from "./tag.edit.component";

describe('TagPostListComponent', () => {
  let component: TagPostListComponent;
  let fixture: ComponentFixture<TagPostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TagListComponent,
        TagEditComponent,
        TagPostListComponent
      ],
      imports: [
        routing,
        SharedModule,
        RouterTestingModule
      ],
      providers: [
        TagService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
