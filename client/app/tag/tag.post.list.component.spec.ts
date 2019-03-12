import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagPostListComponent } from './tag.post.list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TagService } from './services/tag.service';
import { routing } from './tag.route';
import { TagListComponent } from './tag.list.component';
import { TagEditComponent } from './tag.edit.component';

describe('TagPostListComponent', () => {
  let component: TagPostListComponent;
  let fixture: ComponentFixture<TagPostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TagListComponent,
        TagEditComponent,
        TagPostListComponent,
      ],
      imports: [
        routing,
        SharedModule,
        RouterTestingModule,
      ],
      providers: [
        TagService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
