import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {AuthService} from "./services/auth.service";
import {SharedModule} from "./shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {ChangeDetectorRef} from "@angular/core";
import {UserService} from "./services/user.service";
import {By} from "@angular/platform-browser";

describe('Component: App', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      providers: [
        AuthService,
        ChangeDetectorRef,
        UserService,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the string "Angular 7 Starter" in .navbar-brand', () => {
    const el = fixture.debugElement.query(By.css('.navbar-brand')).nativeElement;
    expect(el.textContent).toContain('Angular 7 Starter');
  });
});
