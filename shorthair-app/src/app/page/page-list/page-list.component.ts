import { HttpService } from './../../shared/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.request('GET', '/user/api').subscribe(
      data => {
        console.log(data);
      },
      response => {
        console.log(response);
      }
    );
  }
}
