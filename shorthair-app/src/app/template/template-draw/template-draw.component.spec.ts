import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDrawComponent } from './template-draw.component';

describe('TemplateDrawComponent', () => {
  let component: TemplateDrawComponent;
  let fixture: ComponentFixture<TemplateDrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateDrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
