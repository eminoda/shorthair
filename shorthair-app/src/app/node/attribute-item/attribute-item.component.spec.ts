import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeItemComponent } from './attribute-item.component';

describe('AttributeItemComponent', () => {
  let component: AttributeItemComponent;
  let fixture: ComponentFixture<AttributeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
