import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PageListComponent } from './page/page-list/page-list.component';
import { TemplateListComponent } from './template/template-list/template-list.component';
import { PageEditComponent } from './page/page-edit/page-edit.component';
import { PageCreateComponent } from './page/page-create/page-create.component';
import { TemplateCreateComponent } from './template/template-create/template-create.component';
import { TemplateEditComponent } from './template/template-edit/template-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/page/list', pathMatch: 'full' },
  { path: 'page/list', component: PageListComponent },
  { path: 'page/create', component: PageCreateComponent },
  { path: 'page/:id', component: PageEditComponent },
  { path: 'template/list', component: TemplateListComponent },
  { path: 'template/create', component: TemplateCreateComponent },
  { path: 'template/:id', component: TemplateEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
