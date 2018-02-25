import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {AdminComponent} from "../admin/admin.component";
import {LoginComponent} from "../login/login.component";
import {PasswordComponent} from "../password.component";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthService} from "../../services/auth.service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {AccountComponent} from "../account.component";
import {LogoutComponent} from "../logout/logout.component";
import {UserService} from "../../services/user.service";
import {routing} from "../account.route";
import {By} from "@angular/platform-browser";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent,
        AccountComponent,
        PasswordComponent,
        LogoutComponent,
        AdminComponent,
        LoginComponent
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the string "Register" in h5', () => {
    const el = fixture.debugElement.query(By.css('h5')).nativeElement;
    expect(el.textContent).toContain('Register');
  });
});
