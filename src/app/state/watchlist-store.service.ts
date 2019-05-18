import { Injectable } from '@angular/core';


import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})

export class WatchlistStore {

  constructor(private angularFirestore: AngularFirestore) {
  }

  getWatchlist() {
    return this.angularFirestore.collection('watchlist').snapshotChanges();
  }
}
