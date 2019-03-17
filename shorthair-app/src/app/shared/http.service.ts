import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  request<R>(req: HttpRequest<string>): Observable<HttpEvent<R>> {
    console.log('http is called');
    const httpRequest = new HttpRequest({});
    return this.http.request(httpRequest);
  }
}
