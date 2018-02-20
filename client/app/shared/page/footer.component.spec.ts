import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
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
    expect(el.textContent).toContain('Footer...');
  });
});
