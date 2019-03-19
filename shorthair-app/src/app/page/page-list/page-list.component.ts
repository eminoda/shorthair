import { HttpService } from './../../shared/http.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { PageOption } from '../../interface/page-option';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {
  list = [];
  pageOption: PageOption = {
    pageSize: 5,
    page: 1
  };

  constructor(private httpService: HttpService, private message: NzMessageService) {}

  ngOnInit() {
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
  queryList() {
    this.httpService
      .request({
        method: 'get',
        url: '/api/pages',
        param: {
          page: this.pageOption.page,
          pageSize: this.pageOption.pageSize
        }
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
}
