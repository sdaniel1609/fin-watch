import { Component, OnInit } from '@angular/core';
import {StocksService} from '../../services/stocks.service';
import {Chart} from 'chart.js';
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
  chart: Chart;

  constructor(private stocksService: StocksService,
              private newsService: NewsService) { }


  chartData = [
    { data: this.closePrice, label: '' },
  ];

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
    if (this.closeDate.length === 0 || this.closePrice.length === 0) {
      this.stocksService.getStockPrices(this.companyTicker)
        .subscribe(
          (res => {
            for (let i = 0; i < 30; i++) {
              this.stockPriceInfo = res['stock_prices'][0];
              this.closePrice.push(res['stock_prices'][i].close);
              this.closeDate.push( res['stock_prices'][i].date);
            }
          }),
          (error1 => console.log(error1)),
          (() => this.loadChart())
        );
      this.dataIsLoaded = true;
    } else {
      this.refreshData();
    }
  }

  refreshData(): void {
    this.closePrice = [];
    this.closeDate = [];
    this.chart.destroy();
    this.loadData();
  }

  loadChart(): void {
    console.log('Loading Chart...')
    console.log(this.closePrice)
    console.log(this.closeDate)
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.closeDate,
        datasets: [
          {
            data: this.closePrice,
            borderColor: '#ba0044',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }



  ngOnInit() {
    console.log(this.companyTicker);
  }
}
