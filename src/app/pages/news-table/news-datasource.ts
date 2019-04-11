import {DataSource} from '@angular/cdk/table';
import {NewsService} from '../../services/news.service';
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {Observable} from 'rxjs';
import {News} from '../../model/news';

export class NewsDataSource extends  DataSource<News> {

  constructor(private newsService: NewsService) {
    super();
  }

  connect(): Observable<News[]> {
    return this.newsService.getNews();
  }
  disconnect() {
  }
}
