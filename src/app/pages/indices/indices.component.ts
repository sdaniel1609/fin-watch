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

  index = [
    {
      symbol: 'DJI',
      name: 'Dow Jones Industrial Average',
      value: null,
      historicalData: [],
      weekChange() {
        const firstValue = this.historicalData[0].value;
        const lastValue  = this.historicalData[6].value;
        const difference = firstValue - lastValue;
        return difference / lastValue ;
      }
    },
    {
      symbol: 'SPX',
      name: 'S&P 500 INDEX',
      value: null,
      historicalData: [],
      weekChange() {
        const firstValue = this.historicalData[0].value;
        const lastValue  = this.historicalData[6].value;
        const difference = lastValue - firstValue;
        return difference / lastValue ;
      }
    },
  ];

  constructor(private indicesService: IndicesService) { }


  getAllIndexValues(): void {
    for (let i = 0; i < this.index.length; i++) {
      this.indicesService.getIndexValue(this.index[i].symbol)
        .subscribe(indexValue => this.index[i].value = indexValue);
    }
  }

  getAllIndexHistorical(): void {
    for (let i = 0; i < this.index.length; i++) {
      this.indicesService.getIndexHistorical(this.index[i].symbol)
        .subscribe(indexHistoric => this.index[i].historicalData = indexHistoric);
    }
  }

  ngOnInit() {
  this.getAllIndexValues();
  this.getAllIndexHistorical();
  console.log(this.index);
  }
}
