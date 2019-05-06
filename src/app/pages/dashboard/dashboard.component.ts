import {AfterContentChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {StocksService} from '../../services/stocks.service';
import {map, mergeMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {forkJoin} from 'rxjs';
import {Company} from '../../model/company';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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
    }

  ngOnInit() {
    this.localStorgeCompanies.push(JSON.parse(localStorage.getItem('companies')));
    this.fetchLocalStorage();
    this.localStorageService.watchStorage().subscribe( data => {
      console.log(data);
      this.fetchLocalStorage();
    });
  }

}
