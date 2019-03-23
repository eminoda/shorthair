import { Component, OnInit } from '@angular/core';
import { StyleModalComponent } from '../style-modal/style-modal.component';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-attribute-item',
  templateUrl: './attribute-item.component.html',
  styleUrls: ['./attribute-item.component.scss']
})
export class AttributeItemComponent implements OnInit {
  attribute = {
    name: '',
    value: null
  };
  constructor(private modalService: NzModalService) {}

  ngOnInit() {}

  showStyleTableModal(e?: Event) {
    if (e) {
      e.preventDefault();
    }
    const modal = this.modalService.create({
      nzTitle: '添加样式',
      nzContent: StyleModalComponent,
      nzComponentParams: {},
      nzFooter: null
    });
  }
}
