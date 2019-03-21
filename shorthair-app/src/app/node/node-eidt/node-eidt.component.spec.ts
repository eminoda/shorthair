import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeEidtComponent } from './node-eidt.component';

describe('NodeEidtComponent', () => {
  let component: NodeEidtComponent;
  let fixture: ComponentFixture<NodeEidtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeEidtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeEidtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
