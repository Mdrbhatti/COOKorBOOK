import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { configuration } from '../config/config';

@Injectable()
export class BackendService {
  baseUrl: string = configuration.backendurl;

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
  // Get all items: (find-food)
  getPublishedItems(id) {
    let query = "";
    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + token);
    if (id) {
      query += `?_id=${id}`;
    }

    return this.http.get(`${this.baseUrl}/v1/pitem${query}`, { headers: headers })
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

  orderItem(id, req) {

    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + token);

    return this.http.post(`${this.baseUrl}/v1/pitem/${id}/order`, req, { headers: headers })
      .map(
      (response: Response) => {
        const data = response.json();
        console.log(data);
        return data;
      })
      .catch(
      (error: Response) => {
        const data = error.json();
        console.log(data);
        return Observable.throw(error.status);
      });

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


  // private serializeDictToQuery(dict, prefix) {
  //   let str = [];
  //   for (let p of Object.keys(dict)) {
  //     let k = prefix ? `${prefix}[${p}]` : p;
  //     let v = dict[p];
  //     if (v !== null && typeof v === 'object') {
  //       str.push(this.serializeDictToQuery(v, k));
  //     } else {
  //       str.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
  //     }
  //   }
  //   return str.join('&');
  // }

  // getItems(params) {
  //   const uri = `${this.baseUrl}/items?${this.serializeDictToQuery(params, null)}`;
  //   const token = localStorage.getItem('token');
  //   const headers = new Headers();
  //   headers.append('Authorization', `JWT ${token}`);
  //   return this.http.get(uri, { headers: headers })
  //     .map((response: Response) => {
  //       const data = response.json();
  //       console.log(data);
  //       return data;
  //     })
  //     .catch((error: Response) => {
  //       console.log(error);
  //       return Observable.throw('Something went wrong@getItems');
  //     });
  // }

  // createItem(title, description, categories, allergens, image) {
  //   const uri = `${this.baseUrl}/items`;
  //   const token = localStorage.getItem('token');
  //   const headers = new Headers();
  //   headers.append('Authorization', `JWT ${token}`);
  //   const body = { title: title, description: description, categories: categories, allergens: allergens, image: image };
  //   return this.http.post(uri, body, { headers: headers })
  //     .map((response: Response) => {
  //       const data = response.json();
  //       console.log(data);
  //       return data;
  //     })
  //     .catch((error: Response) => {
  //       console.log(error);
  //       return Observable.throw('Something went wrong@createItem');
  //     });
  // }

  publishItem(body) {
    const uri = `${this.baseUrl}/v1/pitem`;
    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Authorization', `JWT ${token}`);
    return this.http.post(uri, body, { headers: headers })
      .map((response: Response) => {
        const data = response.json();
        console.log(data);
        return data;
      })
      .catch((error: Response) => {
        console.log(error);
        return Observable.throw('Something went wrong@publishItem');
      })
  }
}
