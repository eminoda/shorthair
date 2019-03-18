import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PageListComponent } from './page-list/page-list.component';

@NgModule({
  declarations: [PageListComponent],
  imports: [CommonModule, HttpClientModule]
})
export class PageModule {}
