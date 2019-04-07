import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PageService } from './page.service';
import { PageListComponent } from './page-list/page-list.component';
import { PageEditComponent } from './page-edit/page-edit.component';
import { PageCreateComponent } from './page-create/page-create.component';

@NgModule({
  declarations: [PageListComponent, PageEditComponent, PageCreateComponent],
  providers: [PageService],
  imports: [SharedModule]
})
export class PageModule {}
