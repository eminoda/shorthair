import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Observable } from 'rxjs';
import { Domain } from '../interface/domain';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  constructor(private httpService: HttpService) {}

  queryList(param): Observable<any> {
    return this.httpService.request({
      method: 'get',
      url: `/api/domains`,
      param
    });
  }

  queryItemById(id: String): Observable<any> {
    return this.httpService.request({
      method: 'get',
      url: `/api/domains/${id}`
    });
  }

  updateItem(id: string, data: Domain): Observable<any> {
    return this.httpService.request({
      method: 'post',
      url: `/api/domains/${id}`,
      body: data
    });
  }

  deleteItem(id: string): Observable<any> {
    return this.httpService.request({
      method: 'delete',
      url: `/api/domains/${id}`
    });
  }

  createItem(data: Domain): Observable<any> {
    return this.httpService.request({
      method: 'post',
      url: `/api/domains`,
      body: data
    });
  }
}
