import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleModalComponent } from './style-modal.component';

describe('StyleModalComponent', () => {
  let component: StyleModalComponent;
  let fixture: ComponentFixture<StyleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
