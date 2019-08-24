import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {INews} from '../model/INews';
import {Observable} from 'rxjs';
import {map, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private url = 'https://api-v2.intrinio.com/companies/news?page_size=5';

  constructor(private http: HttpClient) { }

  getNews(): Observable<INews[]> {
    return this.http.get<INews[]>(this.url)
      .pipe(
        map(res => res ['news']),
        retry(2)
      );
  }

  getCompanyNews(stock: string) {
    const url = `https://api-v2.intrinio.com/companies/${stock}/news?page_size=10`;
    return this.http.get(url)
      .pipe(
        map( res => res['news']),
        retry(2)
      );
  }
}
