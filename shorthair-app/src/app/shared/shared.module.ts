import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';
import { DeleteTextPipe } from './pipe/delete-text.pipe';

@NgModule({
  declarations: [DeleteTextPipe],
  imports: [CommonModule],
  providers: [HttpService],
  exports: [DeleteTextPipe]
})
export class SharedModule {}
