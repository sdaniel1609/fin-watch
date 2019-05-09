import { Injectable } from '@angular/core';
import {SearchedCompany} from '../model/searchedCompany';
import {Observable, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private companies: string[];
  private nextId: number;
  private storageSubject = new Subject<boolean>();

  watchStorage(): Observable<any> {
    return this.storageSubject.asObservable();
  }

  constructor() {
    const companies = this.getCompanies();

    if (companies.length === 0) {
      this.nextId = 0;
    } else {
      const maxId = companies[companies.length - 1].id;
      this.nextId = maxId + 1;
    }
  }

  public addCompany(text: string): void {

      const company = new SearchedCompany(this.nextId, text);
      const companies = this.getCompanies();
      companies.push(company);
      this.setLocalStorageCompanies(companies);
      this.nextId++;
      this.storageSubject.next(true);
  }


  public getCompanies() {
    const localStorageItem = JSON.parse(localStorage.getItem('companies'));
    return localStorageItem == null ? [] : localStorageItem.companies;
  }


  private setLocalStorageCompanies(company: string[]): void {
    localStorage.setItem('companies', JSON.stringify({companies: company}));
  }
}
