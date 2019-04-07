import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DomainListComponent } from './domain-list/domain-list.component';
import { DomainCreateModalComponent } from './domain-create-modal/domain-create-modal.component';
import { DomainEditModalComponent } from './domain-edit-modal/domain-edit-modal.component';

@NgModule({
  entryComponents: [DomainCreateModalComponent, DomainEditModalComponent],
  declarations: [DomainListComponent, DomainCreateModalComponent, DomainEditModalComponent],
  providers: [],
  imports: [SharedModule]
})
export class DomainModule {}
