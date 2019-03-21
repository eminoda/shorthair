import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { PageOption } from '../../interface/page-option';
import { Observable } from 'rxjs';
import { NodeService } from '../node.service';

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.scss']
})
export class NodeListComponent implements OnInit {
  list = [];
  pageOption: PageOption = {
    pageSize: 5,
    page: 1
  };

  constructor(private nodeService: NodeService, private message: NzMessageService) {}

  ngOnInit() {
    this.queryList();
  }

  queryList() {
    this.nodeService
      .queryList({
        page: this.pageOption.page,
        pageSize: this.pageOption.pageSize
      })
      .subscribe(
        resp => {
          this.list = resp.data.list;
          this.pageOption.total = resp.data.total;
        },
        err => {
          this.message.error(err.message);
        }
      );
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
