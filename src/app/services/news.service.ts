import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {News} from '../model/news';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private url = 'https://api-v2.intrinio.com/companies/news?page_size=10';

  private companyUrl = 'https://api-v2.intrinio.com/companies/'
  constructor(private http: HttpClient) { }

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(this.url)
      .pipe(
        map(res => res ['news'])
      );
  }

  getCompanyInfo(company: string): Observable<any> {
    const url = `${this.companyUrl}${company}`;
    return this.http.get(url);
  }
}
