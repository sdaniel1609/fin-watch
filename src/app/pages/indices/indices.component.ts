import { Component, OnInit } from '@angular/core';
import {IndicesService} from '../../services/indices.service';
import {MatTableDataSource} from '@angular/material';
import {forkJoin} from 'rxjs';
import {Index} from '../../model';



@Component({
  selector: 'app-indices',
  templateUrl: './indices.component.html',
  styleUrls: ['./indices.component.css']
})

export class IndicesComponent implements OnInit {

  indices: Index[] = [];
  displayedColumns: string[] = ['index', 'ticker', 'indexValue', 'priceChange'];
  dataSource = new MatTableDataSource<Index>();

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

  constructor(private indicesService: IndicesService) { }

  getIndices(): void {
   this.trackedIndicesRR.forEach((el) => {
     const indexValue = this.indicesService.getIndexValueRR(el.symbol);
     const indexHistoricalValue = this.indicesService.getIndexHistoricalValueRR(el.symbol);

     forkJoin([indexValue, indexHistoricalValue]).subscribe(results => {
       const value = results[0];
       const historical_value = results[1]['historical_data'];
        this.indices.push(new Index(el.name, el.symbol, value, historical_value));
        this.dataSource.data = this.indices as Index [];
        this.showSpinner = false;
     });
   });
  }



  ngOnInit() {
  this.getIndices();
  }
}
