import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {WatchList} from './firebase.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  list = [];

  private subject = new BehaviorSubject<any>([]);
  watchListCollection: AngularFirestoreCollection<WatchList>;

  addToWatchList(list) {
    const exists = this.list.some(el => el.name === list.name);
    if (!exists) {
      this.list.push(list);
    } else {
      console.log('stock already exists in watchlist');
    }
  }

  constructor(private afs: AngularFirestore) {
    this.watchListCollection = this.afs.collection('watchlist');
  }

  getSubject(): Observable<any> {
    return this.subject.asObservable();
  }


}
