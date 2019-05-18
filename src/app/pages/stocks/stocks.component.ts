import { Component, OnInit } from '@angular/core';
import {StocksService} from '../../services/stocks.service';
import {MatTableDataSource} from '@angular/material';
import {Company} from '../../model/company';

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

  showSpinner = true;

  constructor(private stocksService: StocksService) { }

  getStockPricesRR(): void {
    this.trackedStocks.forEach((el) => {
      this.stocksService.getStockPrices(el)
        .subscribe(companyDetails => {
          this.stocksRR.push(new Company(companyDetails['security'].name, el,
            companyDetails['stock_prices'][0].close, companyDetails['stock_prices']));
          this.dataSource.data =  this.stocksRR as Company [];
          this.showSpinner = false;
        });
    });
  }

  ngOnInit() {
    this.getStockPricesRR();
  }

}
