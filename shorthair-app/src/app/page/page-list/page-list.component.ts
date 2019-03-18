import { HttpService } from './../../shared/http.service';
import { Component, OnInit } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService
      .request({
        method: 'GET',
        url: '/api/wtemplates'
      })
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
  }
}
