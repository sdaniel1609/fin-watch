import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

import {CryptoService} from '../../services/crypto.service';
import {Currency} from '../../model/Currency';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss']
})
export class CryptoComponent implements OnInit {

  showSpinner = true;
  cryptos: Currency[] = [];

  displayedColumns: string[] = ['pair', 'exchange', 'price', 'date'];
  dataSource = new MatTableDataSource<Currency>();

  trackedCryptoPairs = [
    {
    cryptoPair: 'btcusd',
    exchange: 'gemini',
    },
    {
      cryptoPair: 'btcusd',
      exchange: 'gdax',
    },
    {
      cryptoPair: 'btcusd',
      exchange: 'binance',
    }
  ];

  constructor(private cryptoService: CryptoService) { }


  getCryptoPricesRR() {
    this.trackedCryptoPairs.forEach((el) => {
      this.cryptoService.getCryptoPrice(el.cryptoPair, el.exchange)
        .subscribe(res => {
          this.cryptos.push(new Currency(el.cryptoPair, res[0].close, res[0].time, el.exchange));
          this.dataSource.data = this.cryptos as Currency [];
          this.showSpinner = false;
        });
    });
  }

  ngOnInit() {
    this.getCryptoPricesRR();
  }

}
