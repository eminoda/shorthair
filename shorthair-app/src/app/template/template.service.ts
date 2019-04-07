import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Observable } from 'rxjs';
import { Template } from '../interface/template';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  constructor(private httpService: HttpService) {}

  queryList(param): Observable<any> {
    return this.httpService.request({
      method: 'get',
      url: `/api/templates`,
      param
    });
  }

  queryItemById(id: String): Observable<any> {
    return this.httpService.request({
      method: 'get',
      url: `/api/templates/${id}`
    });
  }

  updateItem(id: string, template: Template): Observable<any> {
    return this.httpService.request({
      method: 'post',
      url: `/api/templates/${id}`,
      body: template
    });
  }

  createItem(template: Template): Observable<any> {
    return this.httpService.request({
      method: 'post',
      url: `/api/templates`,
      body: template
    });
  }

  parseNodeToForm(node: any, form: FormGroup) {
    console.log('同步 form');
    if (node && node.styleTable) {
      let styleTable = node.styleTable;
      for (let key in form.value) {
        let val = styleTable[key];
        if (val) {
          let item = form.get(key);
          item.setValue(val);
        }
      }
    }
    return form;
  }
}
