import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedTestComponent } from './speed-test.component';

describe('SpeedTestComponent', () => {
  let component: SpeedTestComponent;
  let fixture: ComponentFixture<SpeedTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpeedTestComponent]
    });
    fixture = TestBed.createComponent(SpeedTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
