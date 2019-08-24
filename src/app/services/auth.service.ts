import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {catchError, map, share, shareReplay, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {throwError} from 'rxjs';
import Swal from 'sweetalert2';

const APIURL = 'http://51.105.27.243:8080/api/auth/signin';

const headers = new HttpHeaders({
  'Content-Type': 'application/json'});

const options = { headers: headers };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  role: String = '';

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) { }

 /* login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }*/

 authenticate(username, password) {

   const data = {
     'usernameOrEmail': username,
     'password': password
   }

   return this.http.post<any>(APIURL, data, options).pipe(
     map(
       userData => {
         sessionStorage.setItem('username', userData.user.username);
         this.role = userData.user.authorities[0].authority;
         const tokenStr = 'Bearer ' + userData.accessToken;
         sessionStorage.setItem('token', tokenStr);
         return userData;
       }),
   catchError(this.handleError)
   );
 }

 isUserLoggedIn() {
   const user = sessionStorage.getItem('username')
   return !(user === null);
 }

 logOut() {
   sessionStorage.removeItem('username');
   sessionStorage.removeItem('token');
 }

 checkAdmin() {
   if (this.role === 'ROLE_ADMIN') {
     return true;
   } else {
     return false;
   }
 }
  handleError(error) {
   const errorMessage = error.error;
   console.log(error)
    if (error.error.error === 'Unauthorized') {
      // client-side error
      Swal.fire({
        type: 'error',
        title: 'Invalid Credentials',
        timer: 2000,
      });
    } else {
      // server-side error
    }
    return throwError(errorMessage);
  }
}
