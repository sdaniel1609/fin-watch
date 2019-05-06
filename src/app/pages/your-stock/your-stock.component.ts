import { Component, OnInit } from '@angular/core';
import {WatchlistDialogComponent} from './watchlist-dialog/watchlist-dialog.component';
import {MatDialog} from '@angular/material';
import {Company} from '../../model/company';
import {StocksService} from '../../services/stocks.service';
import {DataService} from '../../services/data.service';
import {mergeMap} from 'rxjs/operators';
import {FirebaseService} from '../../services/firebase.service';
export interface WatchList {
  id?: string;
  name: string;
}

@Component({
  selector: 'app-your-stock',
  templateUrl: './your-stock.component.html',
  styleUrls: ['./your-stock.component.css']
})
export class YourStockComponent implements OnInit {
  watchList = [];
  distinctWatchList = [];
  companies: Company[] = [];

  constructor(public dialog: MatDialog, private stockService: StocksService,
              private dataService: DataService,
              private firebaseService: FirebaseService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(WatchlistDialogComponent, {
      width: '80%',
    });

  }

  stockValueChange(currentValue: number, historicalValue: number) {
    const difference = currentValue - historicalValue;
    return difference / historicalValue;
  }

  removeDuplicates() {
    this.watchList = [...new Set(this.distinctWatchList)];
    console.log(this.distinctWatchList);
  }
/*

  setCompanies() {
    this.dataService.currentData.subscribe(
      data => {
        if (data !== null) {
          this.stockService.getStockTicker(data).pipe(
            mergeMap(company => this.stockService.getStockPrices(company.ticker)
            ))
            .subscribe(
              companyDetails => {
                this.companies.push(new Company(companyDetails.security.name, companyDetails.security.ticker, companyDetails.stock_prices));
              });
        }
      }
    );
  }
*/

  setCompanies(): void {
    for (let i = 0; i < 5; i++) {
      this.stockService.getStockTicker(this.watchList[i].name).pipe(
        mergeMap(company => this.stockService.getStockPrices(company.ticker)
        ))
        .subscribe(companyDetails => {
            this.companies.push(new Company(companyDetails.security.name, companyDetails.security.ticker, companyDetails.stock_prices));
        });
    }
  }

  getDBWatchlist() {
    this.firebaseService.getWatchList()
      .subscribe(watchList => {
        this.watchList = watchList as WatchList[];
        this.setCompanies();
        });
  }

  deleteWatchListItem(name: string) {
    for (let i = 0; i < this.companies.length; i++) {
      if (this.watchList[i].name === name) {
        this.watchList.splice(i, 1);
        console.log(this.watchList);
      }
    }
  }

  ngOnInit() {
    this.getDBWatchlist();
  }


}
