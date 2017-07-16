import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class CookOrBookApiService {
  constructor(private http: Http) { }

  // Adjusted from https://stackoverflow.com/a/1714899/552214
  private serializeDictToQuery(dict, prefix) {
    let str = [];
    for (let p of Object.keys(dict)) {
      let k = prefix ? `${prefix}[${p}]` : p;
      let v = dict[p];
      if (v !== null && typeof v === 'object') {
        str.push(this.serializeDictToQuery(v, k));
      } else {
        str.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
      }
    }
    return str.join('&');
  }

  getItems(params) {
    const uri = `${environment.backend_url}/items${this.serializeDictToQuery(params, null)}`;
    return this.http.get(uri);
  }

  createItem(title, description, categories, allergens, image) {
    const uri = `${environment.backend_url}/items`;
    console.log(`Contacting ${uri}`);
    return this.http.post(uri, { title: title, description: description, categories: categories, allergens: allergens, image: image });
  }

  publishItem(params) {

  }
}

