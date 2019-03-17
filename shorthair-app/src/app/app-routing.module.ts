import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PageListComponent } from './page/page-list/page-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/page', pathMatch: 'full' },
  { path: 'page', component: PageListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
