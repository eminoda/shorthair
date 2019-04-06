import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TemplateService } from './template.service';
import { TemplateDrawComponent } from './template-draw/template-draw.component';
import { TemplatePreviewComponent } from './template-preview/template-preview.component';
import { PositionPanelComponent } from './position-panel/position-panel.component';
import { SurfacePanelComponent } from './surface-panel/surface-panel.component';
import { EventPanelComponent } from './event-panel/event-panel.component';

@NgModule({
  declarations: [TemplateDrawComponent, TemplatePreviewComponent, PositionPanelComponent, SurfacePanelComponent, EventPanelComponent],
  providers: [TemplateService],
  imports: [SharedModule]
})
export class TemplateModule {}
