import { Component, OnInit } from '@angular/core';
import {StocksService} from '../../services/stocks.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  hide: boolean;
  companyNames = [];

  companies = [
    {
    companyName: null,
    companyTicker: null,
    stockPrice: []
  },
    {
      companyName: null,
      companyTicker: null,
      stockPrice: []
    },
    {
      companyName: null,
      companyTicker: null,
      stockPrice: []
    },
  ];

  constructor(private stockService: StocksService) { }

  fetch() {
    for (let i = 0; i < 3; i++) {
      this.companyNames = JSON.parse(localStorage.getItem('companies')).companies[i].name;
    }
  }

  fetchLocalStorageCompanies(): void  {
    for (let i = 0; i < 3; i++) {
      this.companies[i].companyName = JSON.parse(localStorage.getItem('companies')).companies[i].name;
    }
    this.getStockTicker();
  }

  removeDuplicates() {

  }

  getStockTicker(): void {
    for (let i = 0; i < 3; i++) {
    this.stockService.getStockTicker(this.companies[i].companyName)
      .subscribe(
        res => this.companies[i].companyTicker = res.ticker,
        error => console.log('Error: ', error),
        () => {
          if (i === 2) {
            this.getStocKPrice();
          }
        }
      );
  }
  }

  getStocKPrice(): void {
      for (let i = 0; i < 3; i++) {
         this.stockService.getStockPrices(this.companies[i].companyTicker)
          .subscribe(
            // test
            res => {
              this.companies[i].stockPrice = res['stock_prices'];
            }
          );
    }
  }

  stockValueChange(currentValue: number, historicalValue: number) {
    const difference = currentValue - historicalValue;
    return difference / historicalValue;
  }


  ngOnInit() {
    this.fetchLocalStorageCompanies();
  }

}
