import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeModalNodeCreateComponent } from './node-modal-node-create.component';

describe('NodeModalNodeCreateComponent', () => {
  let component: NodeModalNodeCreateComponent;
  let fixture: ComponentFixture<NodeModalNodeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeModalNodeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeModalNodeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
