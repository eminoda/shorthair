import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PageListComponent } from './page/page-list/page-list.component';
import { TemplateListComponent } from './template/template-list/template-list.component';
import { NodeListComponent } from './node/node-list/node-list.component';
import { WebsiteListComponent } from './website/website-list/website-list.component';
import { PageEditComponent } from './page/page-edit/page-edit.component';
import { PageCreateComponent } from './page/page-create/page-create.component';
import { TemplateCreateComponent } from './template/template-create/template-create.component';
import { TemplateEditComponent } from './template/template-edit/template-edit.component';
import { NodeCreateComponent } from './node/node-create/node-create.component';
import { NodeEidtComponent } from './node/node-eidt/node-eidt.component';
import { NodeTreeComponent } from './node/node-tree/node-tree.component';

const routes: Routes = [
  { path: '', redirectTo: '/page/list', pathMatch: 'full' },
  { path: 'page/list', component: PageListComponent },
  { path: 'page/create', component: PageCreateComponent },
  { path: 'page/:id', component: PageEditComponent },
  { path: 'template/list', component: TemplateListComponent },
  { path: 'template/create', component: TemplateCreateComponent },
  { path: 'template/:id', component: TemplateEditComponent },
  { path: 'node/list', component: NodeListComponent },
  { path: 'node/create', component: NodeCreateComponent },
  { path: 'node/tree/:id', component: NodeTreeComponent },
  { path: 'node/:id', component: NodeEidtComponent },
  { path: 'website/list', component: WebsiteListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
