import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipbookAnimationComponent } from './flipbook-animation.component';

describe('FlipbookAnimationComponent', () => {
  let component: FlipbookAnimationComponent;
  let fixture: ComponentFixture<FlipbookAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlipbookAnimationComponent]
    });
    fixture = TestBed.createComponent(FlipbookAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
