import { Component, OnInit } from '@angular/core';
import {ForexService} from '../../services/forex.service';
import {Forex} from '../../model/forex';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-forex',
  templateUrl: './forex.component.html',
  styleUrls: ['./forex.component.css']
})
export class ForexComponent implements OnInit {
  showSpinner = true;
  currencyPairs = [
    {
    currencyPair: 'GBPUSD',
    currencyPairPrice: null
    },
    {
      currencyPair: 'EURUSD',
      currencyPairPrice: null
    },
    {
      currencyPair: 'USDJPY',
      currencyPairPrice: null
    },
    {
      currencyPair: 'USDCHF',
      currencyPairPrice: null
    },
  ];

  constructor(private forexService: ForexService) { }

  getCurrencyPrice() {
    for (let i = 0; i < this.currencyPairs.length; i++ ) {
      this.forexService.getCurrencyPrice(this.currencyPairs[i].currencyPair)
        .subscribe(res => {
          this.currencyPairs[i].currencyPairPrice = res;
          if (i === this.currencyPairs.length -1 ) {
            this.showSpinner = false;
          }
        });
    }
  }
  ngOnInit() {
   this.getCurrencyPrice();

}}
