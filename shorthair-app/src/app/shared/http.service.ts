import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders, HttpEventType, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestOption } from '../interface/request-option';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public request(req: RequestOption): Observable<any> {
    req.method = req.method ? req.method.toUpperCase() : 'GET';

    const httpRequest = new HttpRequest(req.method, req.url, this.appendParams(req.body), {
      headers: this.setDefaultHeaders(),
      params: this.appendParams(req.param),
      responseType: 'json'
    });

    return Observable.create(observer => {
      this.http.request(httpRequest).subscribe(
        (res: HttpResponse<any>) => {
          if (res.type == HttpEventType.Response) {
            let data = res.body;
            if (data.success) {
              observer.next(res.body);
            } else {
              observer.error(new Error(data.resultMsg));
            }
          }
        },
        (err: HttpErrorResponse) => {
          observer.error(err.statusText);
        }
      );
      return observer;
    });
  }

  private appendParams(obj) {
    let params = new HttpParams();
    for (let key in obj) {
      if (obj[key] || obj[key] === false) {
        // serialize array params
        if (obj[key] instanceof Array) {
          let objs = obj[key];
          objs.forEach(element => {
            params = params.append(`${key}`, String(JSON.stringify(element)));
          });
        } else {
          params = params.set(key, String(obj[key]));
        }
      }
    }
    return params;
  }

  private setDefaultHeaders(headers?: any) {
    if (!headers) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-type', 'application/x-www-form-urlencoded');
      headers = headers.set('X-Requested-With', 'XMLHttpRequest');
      return headers;
    }
    return headers;
  }
}
