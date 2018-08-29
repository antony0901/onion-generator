import { Http, Headers, RequestOptionsArgs } from "@angular/http";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpClientService {
  constructor(private _http: Http){}
}