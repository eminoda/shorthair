import { NgModule } from '@angular/core';
import { PageListComponent } from './page-list/page-list.component';
import { SharedModule } from '../shared/shared.module';
import { PageEditComponent } from './page-edit/page-edit.component';
import { PageCreateComponent } from './page-create/page-create.component';
import { PageService } from './page.service';

@NgModule({
  declarations: [PageListComponent, PageEditComponent, PageCreateComponent],
  providers: [PageService],
  imports: [SharedModule]
})
export class PageModule {}
