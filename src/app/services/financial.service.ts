import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Financial} from '../model/Financial';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {

  constructor(private http: HttpClient) { }


  getCompanyFinancials(ticker: string): Observable<Financial> {
    const url = `https://api-v2.intrinio.com/fundamentals/${ticker}-income_statement-2018-Q1/standardized_financials`
    return this.http.get<Financial>(url)
      .pipe(map( res => {
        return new Financial(res);
      }));
  }

}
