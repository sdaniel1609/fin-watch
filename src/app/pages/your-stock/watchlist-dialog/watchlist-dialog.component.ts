import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from '@angular/material';
import {YourStockComponent} from '../your-stock.component';
import {DBStock} from '../../../model/DBStock';
import {StocksService} from '../../../services/stocks.service';
import {DataService} from '../../../services/data.service';
import {FirebaseService} from '../../../services/firebase.service';

@Component({
  selector: 'app-watchlist-dialog',
  templateUrl: './watchlist-dialog.component.html',
  styleUrls: ['./watchlist-dialog.component.css']
})
export class WatchlistDialogComponent implements OnInit {
  watchList = [];
  displayedColumns: string[] = ['name', 'ticker', 'exchange'];
  dataSource = new MatTableDataSource<DBStock>();

  @Output() submitStock = new EventEmitter<any>();

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(public dialogRef: MatDialogRef<YourStockComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private stockService: StocksService,
              private dataService: DataService,
              private fireBaseService: FirebaseService) { }

  ngOnInit() {
      this.getDBStocks();
  }

  selected(name) {
    this.fireBaseService.addToWatchList(name);
  }

  getDBStocks() {
    this.stockService.getDBStocks()
      .subscribe(stocks => {
        this.dataSource.data = stocks as DBStock[];
      });
  }

  closeDialog() {
    this.dialogRef.close(this.watchList);
  }
}
