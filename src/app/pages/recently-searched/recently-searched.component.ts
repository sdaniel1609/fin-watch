import { Component, OnInit } from '@angular/core';
import {Company} from '../../model/company';
import {StocksService} from '../../services/stocks.service';
import {concatMap, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-recently-searched',
  templateUrl: './recently-searched.component.html',
  styleUrls: ['./recently-searched.component.css']
})
export class RecentlySearchedComponent implements OnInit {

  localStorageCompanies = [];
  loadedCompanies: Company[] = [];
  distinctCompanyNames = [];
  companyNames = [];
  showSpinner = true;

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
    for (let i = 0; i < this.distinctCompanyNames.length; i++) {
      this.stockService.getStockTicker(this.distinctCompanyNames[i]).pipe(
        mergeMap(company => this.stockService.getStockPrices(company.ticker)
        ))
        .subscribe(companyDetails => {
          if (this.loadedCompanies.length < 3) {
            this.loadedCompanies.push(new Company(companyDetails.security.name, companyDetails.security.ticker, companyDetails.stock_prices));
          this.showSpinner = false;
          }
        });
    }
  }

  ngOnInit() {
   this.localStorageCompanies.push(JSON.parse(localStorage.getItem('companies')));
    this.fetchLocalStorage();
  }

}
