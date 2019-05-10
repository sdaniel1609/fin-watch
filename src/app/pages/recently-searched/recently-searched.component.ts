import { Component, OnInit } from '@angular/core';
import {Company} from '../../model/company';
import {StocksService} from '../../services/stocks.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-recently-searched',
  templateUrl: './recently-searched.component.html',
  styleUrls: ['./recently-searched.component.css']
})
export class RecentlySearchedComponent implements OnInit {

  localStorgeCompanies = [];
  loadedCompanies: Company[] = [];
  distinctCompanyNames = [];
  hide = true;
  companyNames = [];

  constructor(private stockService: StocksService, private localStorageService: LocalStorageService) { }

  fetchLocalStorage() {
    for (let i = 0; i < this.localStorgeCompanies[0].companies.length; i++) {
      if (localStorage.getItem('companies') != null) {
        this.companyNames.push(JSON.parse(localStorage.getItem('companies')).companies[i].name);
      }
    }
    this.removeDuplicates();
  }


  removeDuplicates() {
    this.distinctCompanyNames = [...new Set(this.companyNames)];
    this.setCompanies();
    this.hide = false;
  }


  stockValueChange(currentValue: number, historicalValue: number) {
    const difference = currentValue - historicalValue;
    return difference / historicalValue;
  }

  setCompanies() {
    this.hide = true;
    for (let i = 0; i < this.distinctCompanyNames.length; i++) {
      this.stockService.getStockTicker(this.distinctCompanyNames[i]).pipe(
        mergeMap(company => this.stockService.getStockPrices(company.ticker)
        ))
        .subscribe(companyDetails => {
          if (this.loadedCompanies.length < 3) {
            this.loadedCompanies.push(new Company(companyDetails.security.name, companyDetails.security.ticker, companyDetails.stock_prices));
          }
        });
    }
    this.hide = false;
  }

  ngOnInit() {
   this.localStorgeCompanies.push(JSON.parse(localStorage.getItem('companies')));
    this.fetchLocalStorage();

  }

}
