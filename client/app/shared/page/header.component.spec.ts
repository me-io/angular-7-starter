import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not show the DOM element', () => {
    const de = fixture.debugElement.query(By.css('div'));
    expect(de).toBeNull();
  });

  it('should show the DOM element', () => {
    component.condition = true;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    const de = fixture.debugElement.query(By.css('div'));
    const el = de.nativeElement;
    expect(de).toBeDefined();
    expect(el.textContent).toContain('Header...');
  });
});
