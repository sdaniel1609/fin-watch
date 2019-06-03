import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {IUser} from '../model/IUser';
import {Observable, from, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection: AngularFirestoreCollection<IUser>;
  users: Observable<IUser[]>;


  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection('users', ref => ref.orderBy('lastName', 'asc'));
  }

  getUsers() {
    this.users = this.userCollection.snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(action => {
            const data = action.payload.doc.data() as IUser;
            data.id = action.payload.doc.id;
            return data;
          });
        })
      );
    return this.users;
  }
}
