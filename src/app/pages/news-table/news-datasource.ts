import {DataSource} from '@angular/cdk/table';
import {NewsService} from '../../services/news.service';
import {Observable} from 'rxjs';
import {INews} from '../../model/INews';

export class NewsDataSource extends  DataSource<INews> {

  constructor(private newsService: NewsService) {
    super();
  }

  connect(): Observable<INews[]> {
    return this.newsService.getNews();
  }
  disconnect() {
  }
}
