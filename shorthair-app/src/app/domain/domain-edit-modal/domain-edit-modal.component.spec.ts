import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainEditModalComponent } from './domain-edit-modal.component';

describe('DomainEditModalComponent', () => {
  let component: DomainEditModalComponent;
  let fixture: ComponentFixture<DomainEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
