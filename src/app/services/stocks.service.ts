import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Company} from '../model/company';


@Injectable({
  providedIn: 'root'
})
export class StocksService {

  stock: string;

  constructor(private http: HttpClient) {
    this.stock = '';
  }

  searchCompanies(companyName: string): Observable<Company> {
    const url = `https://api-v2.intrinio.com/companies/search?query=${companyName}`;
    return this.http.get<Company>(url)
      .pipe(
        map (response => {
          return response['companies'];
        })
      );
  }

  getStockTicker(companyName: string) {
    const url = `https://api-v2.intrinio.com/companies/search?query=${companyName}`;
    return this.http.get(url)
      .pipe(
        map(res => {
          return res['companies'][0];
        })
      );
  }

  getStockPrices(stock: string) {
    const url = `https://api-v2.intrinio.com/securities/${stock}/prices`
    return this.http.get(url)
      .pipe(
        map(res => {
          console.log('From get stock prices: ' + res['stock_prices'][0])
          return res;
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

}
