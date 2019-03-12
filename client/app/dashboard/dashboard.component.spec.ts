import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { AdminComponent } from '../account/admin/admin.component';
import { LoginComponent } from '../account/login/login.component';
import { PasswordComponent } from '../account/password.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from '../account/register/register.component';
import { AccountComponent } from '../account/account.component';
import { LogoutComponent } from '../account/logout/logout.component';
import { UserService } from '../services/user.service';
import { routing } from '../routing.module';
import { AboutComponent } from '../about/about.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { APP_BASE_HREF } from '@angular/common';
import { PostService } from '../post/services/post.service';
import { TagService } from '../tag/services/tag.service';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        AboutComponent,
        NotFoundComponent,
        LoginComponent,
        AccountComponent,
        PasswordComponent,
        RegisterComponent,
        LogoutComponent,
        AdminComponent,
      ],
      imports: [
        routing,
        SharedModule,
        RouterTestingModule,
      ],
      providers: [
        AuthService,
        UserService,
        PostService,
        TagService,
        { provide: APP_BASE_HREF, useValue: '/' },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the string "Posts" in h5', async(() => {
    const el = fixture.debugElement.query(By.css('.card-header')).nativeElement;
    expect(el.textContent).toContain('Loading...');
  }));

  it('should display the string "Tags" in h5', () => {
    const el = fixture.debugElement.query(By.css('h5')).nativeElement;
    expect(el.textContent).toContain('Tags');
  });
});
