import { Component, OnInit } from '@angular/core';
import {StocksService} from '../../services/stocks.service';
import {Chart} from 'chart.js';
import {NewsService} from '../../services/news.service';
import {ActivatedRoute} from '@angular/router';
import {IStockPrice} from '../../model/StockPrice';
import {Financial} from '../../model/Financial';
import {FinancialService} from '../../services/financial.service';

@Component({
  selector: 'app-company-lookup',
  templateUrl: './company-lookup.component.html',
  styleUrls: ['./company-lookup.component.css']
})
export class CompanyLookupComponent implements OnInit {

  companyName: string;
  company: any = [];
  closePrice = [];
  closeDate = [];
  stockSummary;
  dataIsLoaded = false;
  stockPriceInfo: IStockPrice;
  news = [];
  chart: Chart;
  financials: Financial;

  constructor(private stocksService: StocksService,
              private newsService: NewsService,
              private route: ActivatedRoute,
              private financialService: FinancialService) { }

  getStockTicker(): void {
      this.stocksService.getStockTicker(this.companyName)
        .subscribe(
          (res => {this.company = res; }),
          (error1 => console.log(error1)),
          (() => {
            this.loadData();
            this.getStockSummary();
            this.getStockNews();
            this.getCompanyFinancials();
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

  getCompanyFinancials(): void {
    this.financialService.getCompanyFinancials(this.company.ticker)
      .subscribe(response => {
        this.financials = response;
        console.log(this.financials);
      });
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

  loadRouteId(): void {
      this.route.params.subscribe((param) => {
        if (param['id']) {
          this.companyName = param['id'];
          this.getStockTicker();
        }
      });
  }

  ngOnInit() {
    this.loadRouteId();
  }
}
