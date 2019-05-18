import { Component, OnInit } from '@angular/core';
import {WatchlistDialogComponent} from './watchlist-dialog/watchlist-dialog.component';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {Company} from '../../model/company';
import {StocksService} from '../../services/stocks.service';
import {DataService} from '../../services/data.service';
import {mergeMap} from 'rxjs/operators';
import {FirebaseService} from '../../services/firebase.service';
import {WatchlistStore} from '../../state/watchlist-store.service';
import {Watchlist} from '../../model/Watchlist';

@Component({
  selector: 'app-your-stock',
  templateUrl: './your-stock.component.html',
  styleUrls: ['./your-stock.component.scss']
})
export class YourStockComponent implements OnInit {
  watchList = [];
  watchListRR = [];

  companies: Company[] = [];

  displayedColumns: string[] = ['companyName', 'ticker', 'stockPrice', 'stockPriceChange', 'action'];
  dataSource = new MatTableDataSource<Company>();

  constructor(public dialog: MatDialog, private stockService: StocksService,
              private dataService: DataService,
              private firebaseService: FirebaseService,
              private watchlistStore: WatchlistStore) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(WatchlistDialogComponent, {
      width: '80%',
      data: this.watchList
    });

  }


  setCompanies(): void {
    this.companies = [];
    for (let i = 0; i < this.watchList.length; i++) {
      this.stockService.getStockTicker(this.watchList[i].name).pipe(
        mergeMap(company => this.stockService.getStockPrices(company.ticker)
        ))
        .subscribe(companyDetails => {
            this.companies.push(new Company(this.watchList[i].name, companyDetails.security.ticker, companyDetails.stock_prices[0].close, companyDetails.stock_prices));
          this.dataSource.data = this.companies as Company [];
        });
    }
  }

  getDBWatchlist() {
    this.firebaseService.getWatchList()
      .subscribe(watchList => {
        this.watchList = watchList as Watchlist[];
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
    this.watchlistStore.getWatchlist().subscribe( watchlist => {
      this.watchListRR = watchlist.map( e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Watchlist;
      });
    });
   }
  }
