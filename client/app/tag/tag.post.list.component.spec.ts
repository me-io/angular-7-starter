import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagPostListComponent } from './tag.post.list.component';

describe('TagPostListComponent', () => {
  let component: TagPostListComponent;
  let fixture: ComponentFixture<TagPostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagPostListComponent ]
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
