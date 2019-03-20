import { NgModule } from '@angular/core';
import { TemplateListComponent } from './template-list/template-list.component';
import { SharedModule } from '../shared/shared.module';
import { TemplateEditComponent } from './template-edit/template-edit.component';
import { TemplateCreateComponent } from './template-create/template-create.component';
import { TemplateService } from './template.service';

@NgModule({
  declarations: [TemplateListComponent, TemplateEditComponent, TemplateCreateComponent],
  providers: [TemplateService],
  imports: [SharedModule]
})
export class TemplateModule {}
