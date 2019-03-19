import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deleteText'
})
export class DeleteTextPipe implements PipeTransform {
  transform(value: boolean, args?: any): any {
    return value ? '恢复' : '删除';
  }
}
