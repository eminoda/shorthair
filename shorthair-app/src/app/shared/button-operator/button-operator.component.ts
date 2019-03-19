import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
/**
 * 示例：
 * <app-button-operator [id]="data.id" (deleteEvent)="deleteById($event)"></app-button-operator>
 *
 * @export
 * @class ButtonOperatorComponent
 * @implements {OnInit}
 *
 * @param Input id string 对象 id
 * @param Input deleteStatus boolean 删除状态
 * @param Output deleteEvent EventEmitter 删除事件
 */
@Component({
  selector: 'app-button-operator',
  templateUrl: './button-operator.component.html',
  styleUrls: ['./button-operator.component.scss']
})
export class ButtonOperatorComponent implements OnInit {
  @Input() deleteStatus: boolean;
  @Input() id: string;
  @Output() deleteEvent = new EventEmitter<Observable<any>>();
  deleteVisable: boolean = false;

  constructor(private httpService: HttpService) {}

  ngOnInit() {}

  handelDeleteOperate(id: string) {
    this.deleteVisable = false;
    this.deleteEvent.emit(
      this.httpService.request({
        method: 'delete',
        url: `/api/pages/${id}`
      })
    );
  }

  showModal(): void {
    this.deleteVisable = true;
  }

  handleCancel(): void {
    this.deleteVisable = false;
  }
}
