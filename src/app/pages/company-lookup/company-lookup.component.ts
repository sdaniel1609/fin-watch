import { Component, OnInit } from '@angular/core';
import {StocksService} from '../../services/stocks.service';
import {Chart} from 'chart.js';
import {t} from '@angular/core/src/render3';
import {NewsService} from '../../services/news.service';

@Component({
  selector: 'app-company-lookup',
  templateUrl: './company-lookup.component.html',
  styleUrls: ['./company-lookup.component.css']
})
export class CompanyLookupComponent implements OnInit {

  company: string;
  companyTicker: string;
  closePrice = [];
  closeDate = [];
  stockSummary;
  dataIsLoaded = false;
  stockPriceInfo;
  news = [];

  constructor(private stocksService: StocksService,
              private newsService: NewsService) { }

  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: this.closePrice, label: '' },
  ];

  chartLabels = this.closeDate;


  getStockTicker(): void {
    console.log(this.company);
      this.stocksService.getStockTicker(this.company)
        .subscribe(
          (res => {this.companyTicker = res; }),
          (error1 => console.log(error1)),
          (() => {
            this.loadData();
            this.chartData[0].label = this.companyTicker;
            this.getStockSummary();
            this.getStockNews();
          })
        );
    }

  getStockSummary(): void {
    this.stocksService.getStockSummary(this.companyTicker)
      .subscribe(stockSummary => this.stockSummary = stockSummary);
  }

  getStockNews(): void {
    this.newsService.getCompanyNews(this.companyTicker)
      .subscribe(res => this.news = res);
  }

  loadData(): void {
      for (let i = 0; i < 30; i++) {
        this.stocksService.getStockPrices(this.companyTicker)
          .subscribe(res => {
            this.stockPriceInfo = res['stock_prices'][0];
            this.closePrice.push(res['stock_prices'][i].close);
            this.closeDate.push( res['stock_prices'][i].date);
          });
      }
    this.dataIsLoaded = true;
  }


  ngOnInit() {
    console.log(this.companyTicker);
  }
}
