import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class ManageService {

  baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: Http, private router: Router) {
  }


}
