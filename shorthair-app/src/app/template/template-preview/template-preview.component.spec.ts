import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePreviewComponent } from './template-preview.component';

describe('TemplatePreviewComponent', () => {
  let component: TemplatePreviewComponent;
  let fixture: ComponentFixture<TemplatePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
