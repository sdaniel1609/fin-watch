import { Component, OnInit } from '@angular/core';
import {StocksService} from '../../services/stocks.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

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
        });
    }
  }
  ngOnInit() {
    this.getStockPrices();
    console.log(this.stocks);
    this.stocksService.getStockPrices('AAPL')
      .subscribe(res => console.log(res));
  }

}
