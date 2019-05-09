import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {FirebaseService} from '../services/firebase.service';
export class WatchList {
  id?: string;
  name: string;
  constructor(id: any, name: any) {
    this.id = id;
    this.name = name;
  }
}
@Injectable({
  providedIn: 'root'
})
export class WatchlistStore {

  private _watchlists: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private firebaseService: FirebaseService) {
    this.loadInitialWatchlist();
  }

  getWatchlist() {
    return this._watchlists.asObservable();
  }

  loadInitialWatchlist() {
    this.firebaseService.getAllWatchlist()
      .subscribe(
        res => {
                this._watchlists.next(res);
        },
        err => console.log('Error retrieving Todos' + err)

      );
  }



}
