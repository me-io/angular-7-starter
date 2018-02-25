import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {routing} from "../account.route";
import {AccountComponent} from "../account.component";
import {PasswordComponent} from "../password.component";
import {RegisterComponent} from "../register/register.component";
import {LogoutComponent} from "../logout/logout.component";
import {AdminComponent} from "../admin/admin.component";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        AccountComponent,
        PasswordComponent,
        RegisterComponent,
        LogoutComponent,
        AdminComponent
      ],
      imports: [
        routing,
        SharedModule,
        RouterTestingModule
      ],
      providers: [
        AuthService,
        UserService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the string "Login" in h5', () => {
    const el = fixture.debugElement.query(By.css('h5')).nativeElement;
    expect(el.textContent).toContain('Login');
  });
});
