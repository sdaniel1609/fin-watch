import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class IndicesService {

  constructor(private http: HttpClient) { }

  private url = 'https://api-v2.intrinio.com/indices/stock_market/$';


  getIndexValueRR(index: string) {
    const url = `${this.url}${index}/data_point/level/number`;
    return this.http.get<number>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getIndexHistoricalValueRR(index: string) {
    const url = `${this.url}${index}/historical_data/level`;
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
