import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../../services/news.service';
import {Company} from '../../../model/company';
import {IndicesService} from '../../../services/indices.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-company-lookup',
  templateUrl: './company-lookup.component.html',
  styleUrls: ['./company-lookup.component.css']
})
export class CompanyLookupComponent implements OnInit {
  company = {} as Company;
  companyInput = new FormControl('');
  searchTerm: string;

  constructor(private newsService: NewsService,
              private indicesService: IndicesService ) { }


  submitSearch(company: string): void{
    this.searchTerm = company;
    this.getCompanyInfo();
  }

  getCompanyInfo() {
    this.newsService.getCompanyInfo(this.searchTerm)
      .subscribe(company => this.company = company);
  }

  ngOnInit() {
   // this.indicesService.getSecurities()
  //    .subscribe(security => console.log(security));
  }

}
