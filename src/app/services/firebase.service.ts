import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface WatchList {
  id?: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  watchListCollection: AngularFirestoreCollection<WatchList>;
  watchList: Observable <WatchList[]>;

  constructor(private fireStore: AngularFirestore, private afs: AngularFirestore) {
    this.watchListCollection = this.afs.collection('watchlist');
  }

  addToWatchList(stock: string) {
    return this.fireStore.collection('watchlist').add({
      name: stock
    });
  }

  deleteWatchList(watchListId: string){
    this.fireStore.doc('watchlist/' + watchListId).delete();
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
