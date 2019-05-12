import { Component, OnInit } from '@angular/core';
import {IndicesService} from '../../services/indices.service';

export interface HistoricalIndex {
  date: Date;
  value: number;
}

@Component({
  selector: 'app-indices',
  templateUrl: './indices.component.html',
  styleUrls: ['./indices.component.css']
})

export class IndicesComponent implements OnInit {

  showSpinner = true;

  // TODO: Rewrite using indices class
  trackedIndices = [
    {
      symbol: 'DJI',
      name: 'Dow Jones Industrial Average',
      value: null,
      historicalData: [{
        date: null,
        value: null
      }],
     },
    {
      symbol: 'SPX',
      name: 'S&P 500',
      value: null,
      historicalData: [{
        date: null,
        value: null
      }],
    },
    {
      symbol: 'NDX',
      name: 'NASDAQ 100 Index',
      value: null,
      historicalData: [{
        date: null,
        value: null
      }],
    }
  ];


  indexValueChange(currentValue: number, historicalValue: number) {
    const difference = currentValue - historicalValue;
    return difference / historicalValue;
  }

  constructor(private indicesService: IndicesService) { }


   getIndexValue(): void {
    for (let i = 0; i < this.trackedIndices.length; i++) {
      this.indicesService.getIndexValue(this.trackedIndices[i].symbol)
        .subscribe(indexValue => this.trackedIndices[i].value = indexValue);
    }
  }

  getIndexHistoricalValue(): void {
    for (let i = 0; i < this.trackedIndices.length; i++) {
      this.indicesService.getIndexHistoricalValue(this.trackedIndices[i].symbol)
        .subscribe(indexHistoric => {
          this.trackedIndices[i].historicalData = indexHistoric;
          if (i === this.trackedIndices.length - 1) {
            this.showSpinner = false;
          }
        });
    }
  }

  ngOnInit() {
  this.getIndexValue();
  this.getIndexHistoricalValue();
  }
}
