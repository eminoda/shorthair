import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainCreateModalComponent } from './domain-create-modal.component';

describe('DomainCreateModalComponent', () => {
  let component: DomainCreateModalComponent;
  let fixture: ComponentFixture<DomainCreateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainCreateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
