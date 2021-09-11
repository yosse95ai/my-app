import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyTempChartComponent } from './hourly-temp-chart.component';

describe('HourlyTempChartComponent', () => {
  let component: HourlyTempChartComponent;
  let fixture: ComponentFixture<HourlyTempChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyTempChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyTempChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
