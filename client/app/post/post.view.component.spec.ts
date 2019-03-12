import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostViewComponent } from './post.view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../services/user.service';
import { routing } from './post.route';
import { PostListComponent } from './post.list.component';
import { PostEditComponent } from './post.edit.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { PostService } from './services/post.service';

describe('PostViewComponent', () => {
  let component: PostViewComponent;
  let fixture: ComponentFixture<PostViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostListComponent,
        PostEditComponent,
        PostViewComponent,
      ],
      imports: [
        routing,
        SharedModule,
        RouterTestingModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
      ],
      providers: [
        AuthService,
        UserService,
        PostService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
