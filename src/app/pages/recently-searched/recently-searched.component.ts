import { Component, OnInit } from '@angular/core';
import {Company} from '../../model/company';
import {StocksService} from '../../services/stocks.service';
import {mergeMap} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material';
import {DBStock} from '../../model/DBStock';

export interface PeriodicElement {
  companyName: string;
  ticker: string;
  stockPrice: number;
  stockPriceChange: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {companyName: 'ff', ticker: 'Hydrogen', stockPrice: 1.0079, stockPriceChange: 22},
];

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

  displayedColumns: string[] = ['companyName', 'ticker', 'stockPrice', 'stockPriceChange'];
  dataSource = new MatTableDataSource<Company>();

  constructor(private stockService: StocksService) { }

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


  stockValueChange(currentValue: number, historicalValue: number) {
    const difference = currentValue - historicalValue;
    return difference / historicalValue;
  }

  setCompanies() {
    this.distinctCompanyNames.forEach((el) => {
        this.stockService.getStockTicker(el).pipe(
          mergeMap(company => this.stockService.getStockPrices(company.ticker)
          )).subscribe( companyDetails => {
          if (this.loadedCompanies.length < 3) {
            console.log(companyDetails);
            this.loadedCompanies.push(new Company(companyDetails.security.name, companyDetails.security.ticker, companyDetails.stock_prices[0].close, companyDetails.stock_prices));
            this.showSpinner = false;
            console.log(this.loadedCompanies);
            this.dataSource.data = this.loadedCompanies as Company [];
          }
        });
    });
  }


  ngOnInit() {
   this.localStorageCompanies.push(JSON.parse(localStorage.getItem('companies')));
    this.fetchLocalStorage();
  }

}
