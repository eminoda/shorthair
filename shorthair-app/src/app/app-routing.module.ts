import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PageListComponent } from './page/page-list/page-list.component';
import { TemplateListComponent } from './template/template-list/template-list.component';
import { NodeListComponent } from './node/node-list/node-list.component';
import { WebsiteListComponent } from './website/website-list/website-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/page/list', pathMatch: 'full' },
  { path: 'page/list', component: PageListComponent },
  { path: 'template/list', component: TemplateListComponent },
  { path: 'node/list', component: NodeListComponent },
  { path: 'website/list', component: WebsiteListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
