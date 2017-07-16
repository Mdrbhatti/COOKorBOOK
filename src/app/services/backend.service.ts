import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class BackendService {
  baseUrl: string = "http://127.0.0.1:8000"

  constructor(private http: Http, private router: Router) { }

  getUserData(id) {
    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + token);

    return this.http.get(`${this.baseUrl}/users?_id=${id}`, { headers: headers })
      .map(
      (response: Response) => {
        const data = response.json();
        console.log(data);
        return data;
      }
      )
      .catch(
      (error: Response) => {
        console.log(error);
        return Observable.throw('Something went wrong@getUserData');
      }
      );
  }

  getPublishedItems() {
    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + token);

    return this.http.get(`${this.baseUrl}/items/published`, { headers: headers })
      .map(
      (response: Response) => {
        const data = response.json();
        console.log(data);
        return data;
      }
      )
      .catch(
      (error: Response) => {
        console.log(error);
        return Observable.throw('Something went wrong@getUserData');
      }
      );
  }

  getUserReviews(id, type) {
    var query = "";
    if (type == "seller") {
      query = `seller=${id}`
    }
    else if (type == "buyer") {
      query = `buyer=${id}`;
    }
    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + token);
    return this.http.get(`${this.baseUrl}/reviews?${query}`, { headers: headers })
      .map(
      (response: Response) => {
        const data = response.json();
        console.log(data);
        return data;
      }
      )
      .catch(
      (error: Response) => {
        console.log(error);
        return Observable.throw('Something went wrong@getUserData');
      }
      );
  }
}