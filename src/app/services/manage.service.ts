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

  updateInventory(){

  }

  getInventory(){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.baseUrl}/items/manage/published`, options).map((response: Response) =>{
      const data = response.json();
      console.log(data);
      return data;
    }).catch(
      (error: Response) => {
        const data = error.json();
        console.log(data);
        return Observable.throw(error.status);
      }
    )

  }



}
