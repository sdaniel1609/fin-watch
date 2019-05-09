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
  companies: Company[] = [];

  constructor(public dialog: MatDialog, private stockService: StocksService,
              private dataService: DataService,
              private firebaseService: FirebaseService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(WatchlistDialogComponent, {
      width: '80%',
      data: this.watchList
    });

  }

  stockValueChange(currentValue: number, historicalValue: number) {
    const difference = currentValue - historicalValue;
    return difference / historicalValue;
  }


  setCompanies(): void {
    this.companies = [];
    for (let i = 0; i < this.watchList.length; i++) {
      this.stockService.getStockTicker(this.watchList[i].name).pipe(
        mergeMap(company => this.stockService.getStockPrices(company.ticker)
        ))
        .subscribe(companyDetails => {
            this.companies.push(new Company(this.watchList[i].name, companyDetails.security.ticker, companyDetails.stock_prices));
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

  deleteWatchListItem(watchlistItem) {
    for (let i = 0; i < this.watchList.length; i++) {
      if (this.watchList[i].name === watchlistItem) {
        this.firebaseService.deleteWatchList(this.watchList[i].id);
      }
    }
  }

  ngOnInit() {
    this.getDBWatchlist();
  }


}
