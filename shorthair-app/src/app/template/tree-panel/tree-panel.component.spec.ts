import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreePanelComponent } from './tree-panel.component';

describe('TreePanelComponent', () => {
  let component: TreePanelComponent;
  let fixture: ComponentFixture<TreePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
