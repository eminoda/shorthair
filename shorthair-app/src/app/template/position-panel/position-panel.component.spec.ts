import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionPanelComponent } from './position-panel.component';

describe('PositionPanelComponent', () => {
  let component: PositionPanelComponent;
  let fixture: ComponentFixture<PositionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
