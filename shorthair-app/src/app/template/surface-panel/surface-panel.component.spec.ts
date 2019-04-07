import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurfacePanelComponent } from './surface-panel.component';

describe('SurfacePanelComponent', () => {
  let component: SurfacePanelComponent;
  let fixture: ComponentFixture<SurfacePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurfacePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurfacePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
