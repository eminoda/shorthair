import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
  HttpEventType,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestOption } from '../interface/request-option';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  request(req: RequestOption): Observable<any> {
    req.method = req.method ? req.method.toUpperCase() : 'GET';

    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/x-www-form-urlencoded');
    headers = headers.set('X-Requested-With', 'XMLHttpRequest');

    const httpRequest = new HttpRequest(req.method, req.url, {
      headers: headers,
      responseType: 'json'
    });
    return Observable.create(observer => {
      this.http.request(httpRequest).subscribe(
        (res: HttpResponse<any>) => {
          if (res.type == HttpEventType.Response) {
            observer.next(res.body);
          }
        },
        (err: HttpErrorResponse) => {
          observer.error(err.statusText);
        }
      );
      return observer;
    });
  }
}
