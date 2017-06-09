import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockwiseComponent } from './clockwise.component';

describe('ClockwiseComponent', () => {
  let component: ClockwiseComponent;
  let fixture: ComponentFixture<ClockwiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClockwiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
