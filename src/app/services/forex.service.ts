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

  private url = 'https://api-v2.intrinio.com/forex/prices/EURUSD/D1';

  getCurrencyPrice(currencyPair: string) {
    const url = `https://api-v2.intrinio.com/forex/prices/${currencyPair}/D1`
    return this.http.get(url)
      .pipe(
        map(res => res ['prices'][0])
      );
  }
}
