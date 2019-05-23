import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Financials} from '../model/Financials';

@Injectable({
  providedIn: 'root'
})
export class FinancialsService {

  constructor(private http: HttpClient) { }


  getCompanyFinancials(ticker: string): Observable<Financials> {
    const url = `https://api-v2.intrinio.com/fundamentals/${ticker}-income_statement-2018-Q1/standardized_financials`
    return this.http.get<Financials>(url)
      .pipe(map( res => {
       return new Financials(res);
      }));
  }
}
