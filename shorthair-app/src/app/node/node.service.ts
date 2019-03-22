import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../shared/http.service';
import { NzTreeNode } from 'ng-zorro-antd';
import { Node } from '../interface/node';
@Injectable({
  providedIn: 'root'
})
export class NodeService {
  constructor(private httpService: HttpService) {}

  queryList(param): Observable<any> {
    return this.httpService.request({
      method: 'get',
      url: `/api/nodes`,
      param
    });
  }

  queryItemById(id: String): Observable<any> {
    return this.httpService.request({
      method: 'get',
      url: `/api/nodes/${id}`
    });
  }

  updateItem(id: string, template: Node): Observable<any> {
    return this.httpService.request({
      method: 'post',
      url: `/api/nodes/${id}`,
      body: template
    });
  }

  createItem(template: Node): Observable<any> {
    return this.httpService.request({
      method: 'post',
      url: `/api/nodes`,
      body: template
    });
  }
}
