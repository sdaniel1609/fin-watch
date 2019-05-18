import { Component, OnInit } from '@angular/core';
import {ForexService} from '../../services/forex.service';
import {Forex} from '../../model/forex';
import {map} from 'rxjs/operators';
import {Currency} from '../../model/Currency';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-forex',
  templateUrl: './forex.component.html',
  styleUrls: ['./forex.component.css']
})
export class ForexComponent implements OnInit {
  showSpinner = true;
  trackedCurrencyPairs = ['GBPUSD', 'EURUSD', 'USDJPY', 'USDCHF']
  currencyPairsRR: Currency[] = [];

  displayedColumns: string[] = ['pair', 'price', 'date'];
  dataSource = new MatTableDataSource<Currency>();

  constructor(public forexService: ForexService) { }

  getCurrencyPriceRR() {
    this.trackedCurrencyPairs.forEach((el) => {
      this.forexService.getCurrencyPrice(el)
        .subscribe(res => {
          this.currencyPairsRR.push(new Currency(el, res.close_bid, res.occurred_at));
          this.dataSource.data = this.currencyPairsRR as Currency[];
          this.showSpinner = false;
        });
    });
  }
  ngOnInit() {
   this.getCurrencyPriceRR();
}}
