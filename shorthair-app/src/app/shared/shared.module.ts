import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';
import { DeleteTextPipe } from './pipe/delete-text.pipe';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ButtonOperatorComponent } from './button-operator/button-operator.component';

@NgModule({
  declarations: [DeleteTextPipe, ButtonOperatorComponent],
  imports: [CommonModule, NgZorroAntdModule],
  providers: [HttpService],
  exports: [DeleteTextPipe, ButtonOperatorComponent]
})
export class SharedModule {}
