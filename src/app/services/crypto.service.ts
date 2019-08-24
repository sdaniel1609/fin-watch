import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private http: HttpClient) { }


  getCryptoPrice(pair: string, exchange: string) {
    const url = `https://api-v2.intrinio.com/crypto/prices?pair=${pair}&timeframe=h1&exchange=${exchange}`;
    return this.http.get(url)
      .pipe(
        map( res => res['prices']),
        retry(2)
      );
  }
}
