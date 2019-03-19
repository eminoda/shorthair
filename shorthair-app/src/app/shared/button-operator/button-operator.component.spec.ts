import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonOperatorComponent } from './button-operator.component';

describe('ButtonOperatorComponent', () => {
  let component: ButtonOperatorComponent;
  let fixture: ComponentFixture<ButtonOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
