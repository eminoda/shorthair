import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Observable } from 'rxjs';
import { Page } from '../interface/page';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  constructor(private httpService: HttpService) {}

  queryList(param): Observable<any> {
    return this.httpService.request({
      method: 'get',
      url: `/api/pages`,
      param
    });
  }

  queryItemById(id: String): Observable<any> {
    return this.httpService.request({
      method: 'get',
      url: `/api/pages/${id}`
    });
  }

  updateItem(id: string, page: Page): Observable<any> {
    return this.httpService.request({
      method: 'post',
      url: `/api/pages/${id}`,
      body: page
    });
  }

  createItem(page: Page): Observable<any> {
    return this.httpService.request({
      method: 'post',
      url: `/api/pages`,
      body: page
    });
  }
}
