import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';
import {ICompanyInfo} from '../model/ICompanyInfo';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {DBStock} from '../model/DBStock';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  stockCollection: AngularFirestoreCollection<DBStock>;
  stocks: Observable<DBStock[]>;

  constructor(private http: HttpClient, private afs: AngularFirestore) {
    this.stockCollection = this.afs.collection('stocks', ref => ref.orderBy('name', 'asc'));
  }

  getStockTicker(companyName: string): Observable<ICompanyInfo> {
    const url = `https://api-v2.intrinio.com/companies/search?query=${companyName}`;
    return this.http.get<ICompanyInfo>(url)
      .pipe(
        map(res => {
          return res['companies'][0];
        })
      );
  }


  getStockPrices(stock: string): Observable<any> {
    const url = `https://api-v2.intrinio.com/securities/${stock}/prices`
    return this.http.get<any>(url)
      .pipe(
        map(res => {
          return res;
        })
      );
  }


  getStockSummary(stock: string) {
    const url = `https://api-v2.intrinio.com/companies/${stock}`;
    return this.http.get(url)
      .pipe(
        map(res => res)
      );
  }

  getDBStocks() {
    this.stocks = this.stockCollection.snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(action => {
            const data = action.payload.doc.data() as DBStock;
            data.id = action.payload.doc.id;
            return data;
          });
        })
      );
    return this.stocks;
  }

}
