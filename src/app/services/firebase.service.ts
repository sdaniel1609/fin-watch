import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';

export interface WatchList {
  id?: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  watchListCollection: AngularFirestoreCollection<any>;
  watchList: Observable <WatchList[]>;
  stockAdded: boolean;


  constructor(private fireStore: AngularFirestore, private afs: AngularFirestore, private af: AngularFireDatabase) {
    this.watchListCollection = this.afs.collection('watchlist');
  }

  addToWatchList(stock: string) {
    this.fireStore.collection('watchlist').ref.where('name', '==', stock).get().then((ref) => {
      const results = ref.docs.map(doc => doc.data() as WatchList);
      if (results.length > 0) {
        console.log('stock already added to watchlist');
        this.stockAdded = false;
      } else {
        this.stockAdded = true;
        return this.fireStore.collection('watchlist').add({
          name: stock
        });
      }
    });
    return this.stockAdded;
  }


  deleteWatchList(watchlistItem) {
    return this.fireStore.collection('watchlist').doc(watchlistItem).delete();
  }

  getWatchList() {
    this.watchList = this.watchListCollection.snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(action => {
            const data = action.payload.doc.data() as WatchList;
            data.id = action.payload.doc.id;
            return data;
          });
        })
      );
    return this.watchList;
  }

}
