import { NgModule } from '@angular/core';
import { NodeListComponent } from './node-list/node-list.component';
import { SharedModule } from '../shared/shared.module';
import { NodeService } from './node.service';

@NgModule({
  declarations: [NodeListComponent],
  providers: [NodeService],
  imports: [SharedModule]
})
export class NodeModule {}
