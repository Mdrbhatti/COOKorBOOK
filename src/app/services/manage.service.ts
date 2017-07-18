import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class ManageService {

  baseUrl: string = "http://127.0.0.1:8000"

  constructor(private http: Http, private router: Router) {
  }

  updateInventory(itemId, price, servings) {
    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + token);
    let options = new RequestOptions({ headers: headers });
    const req = {
      'itemId': itemId, 'pricePerPortion': price, 'servings': servings
    }
    return this.http.post(`${this.baseUrl}/items/manage`, req, options).map((response: Response) => {
      const data = response.json();
      console.log(data);
      return data;
    }).catch((error: Response) => {
      const data = error.json();
      console.log(data);
      return Observable.throw(error.status);
    });
  }

  getInventory() {
    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.baseUrl}/v1/pitem`, options).map((response: Response) => {
      const data = response.json();
      console.log(data);
      return data;
    }).catch(
      (error: Response) => {
        const data = error.json();
        console.log(data);
        return Observable.throw(error.status);
      }
      );
  }

  dropMeal(itemId: string) {
    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + token);
    const options = new RequestOptions({ headers: headers });
    const req = {
      'itemId': itemId
    }
    return this.http.post(`${this.baseUrl}/items/manage/delete`, req, options).map((response: Response) => {
      const data = response.json();
      console.log(data);
      return data;
    }).catch((error: Response) => {
      const data = error.json();
      console.log(data);
      return Observable.throw(error.status);
    });
  }
}
