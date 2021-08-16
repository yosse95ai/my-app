import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugListTableComponent } from './debug-list-table.component';

describe('DebugListTableComponent', () => {
  let component: DebugListTableComponent;
  let fixture: ComponentFixture<DebugListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebugListTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebugListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
