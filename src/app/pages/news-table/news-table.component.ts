import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NewsService} from '../../services/news.service';
import {News} from '../../model/news';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {NewsDataSource} from './news-datasource';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.css']
})
export class NewsTableComponent implements OnInit {

  news: News[];
  dataSource: NewsDataSource;
  displayedColumns = ['publicationDate', 'company', 'title'];

  constructor(private newsService: NewsService) { }

  getNews() {
    this.newsService.getNews()
      .subscribe(news => this.news = news);
  }

  ngOnInit() {
   /* this.getNews();
    this.dataSource = new NewsDataSource(this.newsService);
    this.newsService.getNews()
      .subscribe((news => console.log(news)));*/
    //   this.newsService.getNews().subscribe(news => console.log(news))
  }
}
