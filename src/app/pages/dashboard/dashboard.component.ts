import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../services/news.service';
import {Company} from '../../model/company';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  company: Company;

  constructor(private newsService: NewsService) { }

  getCompanyInfo(com: string) {
    this.newsService.getCompanyInfo(com)
      .subscribe(company => this.company = company);
  }

  ngOnInit() {
   // this.getCompanyInfo('AAPL');
  }

}
