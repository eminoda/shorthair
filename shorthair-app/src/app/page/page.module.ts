import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PageListComponent } from './page-list/page-list.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [PageListComponent],
  imports: [CommonModule, HttpClientModule, NgZorroAntdModule]
})
export class PageModule {}
