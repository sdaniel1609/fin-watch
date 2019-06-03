import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForexService {

  constructor(private http: HttpClient) { }

  getCurrencyPrice(currencyPair: string) {
    const url = `https://api-v2.intrinio.com/forex/prices/${currencyPair}/D1`
    return this.http.get(url)
      .pipe(
        map(res => res ['prices'][0])
      );
  }
}
