import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalogicClockComponent } from './analogic-clock.component';

describe('AnalogicClockComponent', () => {
  let component: AnalogicClockComponent;
  let fixture: ComponentFixture<AnalogicClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalogicClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalogicClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
