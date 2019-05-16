import { Component, OnInit } from '@angular/core';
import {StocksService} from '../../services/stocks.service';
import {MatTableDataSource} from '@angular/material';
import {Company} from '../../model/company';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})


export class StocksComponent implements OnInit {

  stocksRR: Company[] = [];

  displayedColumns: string[] = ['stockName', 'ticker', 'price', 'priceChange'];
  dataSource = new MatTableDataSource<Company>();

  trackedStocks: string [] = ['AAPL', 'XOM', 'WMT', 'INTC' ];

  // TODO: Rewrite using stocks class
  stocks = [
    {
      security: 'AAPL',
      name: null,
      stock_prices: [],
    },
    {
      security: 'XOM',
      name: null,
      stock_prices: [],
    },
    {
      security: 'WMT',
      name: null,
      stock_prices: [],
    },
    {
      security: 'INTC',
      name: null,
      stock_prices: [],
    },
  ]

  showSpinner = true;

  constructor(private stocksService: StocksService) { }

  stockValueChange(currentValue: number, historicalValue: number) {
    const difference = currentValue - historicalValue;
    return difference / historicalValue;
  }

  getStockPrices(): void {
    for (let i = 0; i < this.stocks.length; i++) {
      this.stocksService.getStockPrices(this.stocks[i].security)
        .subscribe(res => {
          this.stocks[i].stock_prices = res['stock_prices'];
          this.stocks[i].name = res['security'].name;
          if (i === this.stocks.length - 1) {
            this.showSpinner = false;
          }
        });
    }
  }

  getStockPricesRR(): void {
    this.trackedStocks.forEach((el) => {
      this.stocksService.getStockPrices(el)
        .subscribe(companyDetails => {
          this.stocksRR.push(new Company(companyDetails['security'].name, el,
            companyDetails['stock_prices'][0].close, companyDetails['stock_prices']));
          this.dataSource.data =  this.stocksRR as Company [];
        });
    });
  }

  ngOnInit() {
    this.getStockPrices();
    this.getStockPricesRR();
  }

}
