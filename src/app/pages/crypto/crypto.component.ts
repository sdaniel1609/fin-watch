import { Component, OnInit } from '@angular/core';
import {Crypto} from '../../model/Crypto';
import {CryptoService} from '../../services/crypto.service';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css']
})
export class CryptoComponent implements OnInit {

  showSpinner = true;

  // TODO: Rewrite using crypto class
  cryptoPairs = [
    {
      cryptoPair: 'btcusd',
      exchange: 'gemini',
      cryptoPrice: null
    },
    {
      cryptoPair: 'btcusd',
      exchange: 'gdax',
      cryptoPrice: null
    },
    {
      cryptoPair: 'btcusd',
      exchange: 'binance',
      cryptoPrice: null
    },
  ];

  constructor(private cryptoService: CryptoService) { }

  getCryptoPrices() {
    for (let i = 0; i < this.cryptoPairs.length; i++) {
      this.cryptoService.getCryptoPrice(this.cryptoPairs[i].cryptoPair, this.cryptoPairs[i].exchange)
        .subscribe( res => {
          this.cryptoPairs[i].cryptoPrice =  res[0];
          if (i === this.cryptoPairs.length - 1 ) {
            this.showSpinner = false;
          }
        });
    }
  }

  ngOnInit() {
    this.getCryptoPrices();
  }

}
