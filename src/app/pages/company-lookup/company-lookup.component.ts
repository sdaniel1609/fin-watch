import { Component, OnInit } from '@angular/core';
import {StocksService} from '../../services/stocks.service';
import {Chart} from 'chart.js';
import {NewsService} from '../../services/news.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-company-lookup',
  templateUrl: './company-lookup.component.html',
  styleUrls: ['./company-lookup.component.css']
})
export class CompanyLookupComponent implements OnInit {

  companyName: string;
  company: any = [];
  companyTicker: string;
  closePrice = [];
  closeDate = [];
  stockSummary;
  dataIsLoaded = false;
  stockPriceInfo;
  news = [];
  chart: Chart;

  constructor(private stocksService: StocksService,
              private newsService: NewsService,
              private route: ActivatedRoute) { }


  getStockTicker(): void {
      this.stocksService.getStockTicker(this.companyName)
        .subscribe(
          (res => {this.company = res; }),
          (error1 => console.log(error1)),
          (() => {
            this.loadData();
            this.getStockSummary();
            this.getStockNews();
          })
        );
    }

  getStockSummary(): void {
    this.stocksService.getStockSummary(this.company.ticker)
      .subscribe(stockSummary => this.stockSummary = stockSummary);
  }

  getStockNews(): void {
    this.newsService.getCompanyNews(this.company.ticker)
      .subscribe(res => this.news = res);
  }

  loadData(): void {
    if (this.closeDate.length === 0 || this.closePrice.length === 0) {
      this.stocksService.getStockPrices(this.company.ticker)
        .subscribe(
          (res => {
            for (let i = 0; i < 30; i++) {
              this.stockPriceInfo = res['stock_prices'][0];
              this.closePrice.push(res['stock_prices'][i].close);
              this.closeDate.push( res['stock_prices'][i].date);
            }
          }),
          (error1 => console.log(error1)),
          (() => {
            this.closePrice.reverse();
            this.closeDate.reverse();
            this.loadChart();
          })
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

  loadId(): void {
    if (this.companyName === undefined) {
      this.route.params.subscribe((param) => {
        this.companyName = param['id'];
      });
      this.getStockTicker();
    }
  }

  ngOnInit() {
    this.loadId();
  }
}
