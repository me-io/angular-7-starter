import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSidebarComponent } from './account-sidebar.component';
import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthService} from "../../services/auth.service";
import {PostEditComponent} from "../../post/post.edit.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {PostListComponent} from "../../post/post.list.component";
import {SharedModule} from "../shared.module";
import {PostService} from "../../post/services/post.service";
import {PostViewComponent} from "../../post/post.view.component";
import {UserService} from "../../services/user.service";
import {routing} from "../../routing.module";
import {DashboardComponent} from "../../dashboard/dashboard.component";

describe('AccountSidebarComponent', () => {
  let component: AccountSidebarComponent;
  let fixture: ComponentFixture<AccountSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
