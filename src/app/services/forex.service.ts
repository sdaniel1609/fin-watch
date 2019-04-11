import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Forex} from '../model/forex';

@Injectable({
  providedIn: 'root'
})
export class ForexService {

  constructor(private http: HttpClient) { }

  private url = 'https://api-v2.intrinio.com/forex/prices/EURUSD/D1?page_size=10';

  getCurrencyPrice() {
    return this.http.get(this.url)
      .pipe(
        map(res => res ['prices'])
      );
  }
}
