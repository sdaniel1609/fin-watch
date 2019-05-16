import { Component, OnInit } from '@angular/core';
import {IndicesService} from '../../services/indices.service';
import {Company} from '../../model/company';
import {MatTableDataSource} from '@angular/material';
import {mergeMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {Index} from '../../model';

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

  indices: Index[] = [];
  displayedColumns: string[] = ['index', 'ticker', 'indexValue', 'priceChange'];
  dataSource = new MatTableDataSource<Company>();


  showSpinner = true;

  trackedIndicesRR = [
    {
      symbol: 'DJI',
      name: 'Dow Jones Industrial Average',
    },
    {
      symbol: 'SPX',
      name: 'S&P 500',
    },
    {
      symbol: 'NDX',
      name: 'NASDAQ 100 Index',
      }
  ];

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

  getHistoricalValues(): void {
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

  getIndices(): void {
   this.trackedIndicesRR.forEach((el) => {
     const indexValue = this.indicesService.getIndexValueRR(el.symbol);
     const indexHistoricalValue = this.indicesService.getIndexHistoricalValueRR(el.symbol);

     forkJoin([indexValue, indexHistoricalValue]).subscribe(results => {
       const value = results[0];
       const historical_value = results[1]['historical_data'];
        this.indices.push(new Company(el.name, el.symbol, value, historical_value));
        console.log(this.indices);

     });
   });
  }



  ngOnInit() {
  this.getIndexValue();
  this.getHistoricalValues();
  this.getIndices();
  }
}
