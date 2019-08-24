import { Component, OnInit} from '@angular/core';
import {NewsService} from '../../services/news.service';
import {INews} from '../../model/INews';
import {NewsDataSource} from './news-datasource';

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.scss']
})
export class NewsTableComponent implements OnInit {

  news: INews[];
  dataSource: NewsDataSource;

  constructor(private newsService: NewsService) { }

  getNews() {
    this.newsService.getNews()
      .subscribe(news => this.news = news);
  }

  ngOnInit() {
   this.getNews();
    this.dataSource = new NewsDataSource(this.newsService);
  }
}
