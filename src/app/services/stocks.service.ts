import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  stock: string;

  constructor(private http: HttpClient) {
    this.stock = '';
  }

  getStockPrices(stock: string) {
    const url = `https://api-v2.intrinio.com/securities/${stock}/prices`
    return this.http.get(url)
      .pipe(
        map(res => res)
      );
  }

  getStockTicker(company: string) {
    const url = `https://api-v2.intrinio.com/companies/search?query=${company}`;
    return this.http.get(url)
      .pipe(
        map(res => {
          console.log(res['companies'][0].ticker)
          return res['companies'][0].ticker;
        })
      );
  }

  getStockSummary(stock: string) {
    const url = `https://api-v2.intrinio.com/companies/${stock}`;
    return this.http.get(url)
      .pipe(
        map(res => res)
      );
  }

  updateSearch(stock: string){
    this.stock = stock;
  }
}
