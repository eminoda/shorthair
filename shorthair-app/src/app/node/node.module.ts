import { NgModule } from '@angular/core';
import { NodeListComponent } from './node-list/node-list.component';
import { SharedModule } from '../shared/shared.module';
import { NodeService } from './node.service';
import { NodeCreateComponent } from './node-create/node-create.component';
import { NodeEidtComponent } from './node-eidt/node-eidt.component';
import { NodeTreeComponent } from './node-tree/node-tree.component';
import { NodeModalNodeCreateComponent } from './node-modal-node-create/node-modal-node-create.component';
import { AttributeItemComponent } from './attribute-item/attribute-item.component';
import { StyleModalComponent } from './style-modal/style-modal.component';

@NgModule({
  declarations: [
    NodeListComponent,
    NodeCreateComponent,
    NodeEidtComponent,
    NodeTreeComponent,
    NodeModalNodeCreateComponent,
    AttributeItemComponent,
    StyleModalComponent
  ],
  entryComponents: [
    NodeModalNodeCreateComponent,
    AttributeItemComponent,
    StyleModalComponent
  ],
  providers: [NodeService],
  imports: [SharedModule]
})
export class NodeModule {}
