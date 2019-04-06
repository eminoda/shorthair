import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { PageOption } from '../../interface/page-option';
import { Observable } from 'rxjs';
import { DomainService } from '../domain.service';
import { DomainCreateModalComponent } from '../domain-create-modal/domain-create-modal.component';
import { DomainEditModalComponent } from '../domain-edit-modal/domain-edit-modal.component';

@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.scss']
})
export class DomainListComponent implements OnInit {
  list = [];
  pageOption: PageOption = {
    pageSize: 5,
    page: 1
  };

  constructor(private DomainService: DomainService, private message: NzMessageService, private modalService: NzModalService) {}

  ngOnInit() {
    this.queryList();
  }

  queryList() {
    this.DomainService.queryList({
      page: this.pageOption.page,
      pageSize: this.pageOption.pageSize
    }).subscribe(
      resp => {
        this.list = resp.data.list;
        this.pageOption.total = resp.data.total;
      },
      err => {
        this.message.error(err.message);
      }
    );
  }

  showDomainCreateModal() {
    let self = this;
    const modal = this.modalService.create({
      nzTitle: '添加',
      nzContent: DomainCreateModalComponent,
      nzFooter: [
        {
          label: '确定',
          onClick(this, instance: DomainCreateModalComponent) {
            instance.saveDomain();
            modal.destroy();
            self.queryList();
          }
        }
      ]
    });
  }

  showDomainEditModal(id: string) {
    let self = this;
    const modal = this.modalService.create({
      nzTitle: '修改',
      nzContent: DomainEditModalComponent,
      nzComponentParams: {
        id: id
      },
      nzFooter: [
        {
          label: '确定',
          onClick(this, instance: DomainEditModalComponent) {
            instance.editDomain();
            modal.destroy();
            self.queryList();
          }
        }
      ]
    });
  }
  pageChange($event) {
    this.pageOption.page = $event;
    this.queryList();
  }

  deleteById($event: Observable<any>) {
    $event.subscribe(
      resp => {
        this.message.info(resp.resultMsg);
        this.queryList();
      },
      err => {
        this.message.info(err.message);
      }
    );
  }
}
