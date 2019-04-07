import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';
import { DeleteTextPipe } from './pipe/delete-text.pipe';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ButtonOperatorComponent } from './button-operator/button-operator.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AttributeDirective } from './directive/attribute.directive';

@NgModule({
  declarations: [DeleteTextPipe, ButtonOperatorComponent, AttributeDirective],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    RouterModule
  ],
  providers: [HttpService],
  exports: [
    DeleteTextPipe,
    AttributeDirective,
    ButtonOperatorComponent,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    RouterModule
  ]
})
export class SharedModule {}
