import { NgModule } from '@angular/core';
import { TemplateListComponent } from './template-list/template-list.component';
import { SharedModule } from '../shared/shared.module';
import { TemplateEditComponent } from './template-edit/template-edit.component';
import { TemplateCreateComponent } from './template-create/template-create.component';

@NgModule({
  declarations: [TemplateListComponent, TemplateEditComponent, TemplateCreateComponent],
  imports: [SharedModule]
})
export class TemplateModule {}
