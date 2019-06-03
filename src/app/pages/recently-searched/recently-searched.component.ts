import { Component, OnInit } from '@angular/core';
import {Company} from '../../model/Company';
import {StocksService} from '../../services/stocks.service';
import {mergeMap} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material';
import Swal from 'sweetalert2';
import {DataService} from '../../services/data.service';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-recently-searched',
  templateUrl: './recently-searched.component.html',
  styleUrls: ['./recently-searched.component.scss']
})
export class RecentlySearchedComponent implements OnInit {

  localStorageCompanies = [];
  loadedCompanies: Company[] = [];
  distinctCompanyNames = [];
  companyNames = [];
  showSpinner = true;
  added: boolean;

  displayedColumns: string[] = ['companyName', 'ticker', 'stockPrice', 'stockPriceChange', 'action'];
  dataSource = new MatTableDataSource<Company>();

  constructor(private stockService: StocksService, private dataService: DataService,
              private fireBaseService: FirebaseService) { }

  fetchLocalStorage() {
    this.localStorageCompanies = (JSON.parse(localStorage.getItem('companies')).companies);
    this.localStorageCompanies.forEach((el) => {
      this.companyNames.push(el.name);
    });
    this.removeDuplicates();
  }

  removeDuplicates() {
    this.distinctCompanyNames = [...new Set(this.companyNames)];
    this.setCompanies();
  }

  add(name: string) {
      this.added = this.fireBaseService.addToWatchList(name);
      if (this.added === true) {
        Swal.fire({
          type: 'success',
          title: `Successfully added ${name} to watchlist`,
          timer: 2000,
        });
      } else  {
        Swal.fire({
          type: 'info',
          title: `${name} already added to watchlist`,
          timer: 2000,
        });
      }
  }

  setCompanies() {
    this.distinctCompanyNames.forEach((el) => {
        this.stockService.getStockTicker(el).pipe(
          mergeMap(company => this.stockService.getStockPrices(company.ticker)
          )).subscribe( companyDetails => {
          if (this.loadedCompanies.length < 3) {
            this.loadedCompanies.push(new Company(companyDetails.security.name, companyDetails.security.ticker, companyDetails.stock_prices[0].close, companyDetails.stock_prices));
            this.showSpinner = false;
            this.dataSource.data = this.loadedCompanies as Company [];
          }
        });
    });
  }


  ngOnInit() {
    if (localStorage.getItem('companies') !== null) {
      this.localStorageCompanies.push(JSON.parse(localStorage.getItem('companies')));
      this.fetchLocalStorage();
    }
  }
}
