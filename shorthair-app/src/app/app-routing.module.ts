import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PageListComponent } from './page/page-list/page-list.component';
import { PageEditComponent } from './page/page-edit/page-edit.component';
import { PageCreateComponent } from './page/page-create/page-create.component';
import { DomainListComponent } from './domain/domain-list/domain-list.component';
import { TemplateDrawComponent } from './template/template-draw/template-draw.component';

const routes: Routes = [
  { path: '', redirectTo: '/page/list', pathMatch: 'full' },
  { path: 'domain/list', component: DomainListComponent },
  { path: 'page/list', component: PageListComponent },
  { path: 'page/create', component: PageCreateComponent },
  { path: 'page/:id', component: PageEditComponent },
  { path: 'template/draw', component: TemplateDrawComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
