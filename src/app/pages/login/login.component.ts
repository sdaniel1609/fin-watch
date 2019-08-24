import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  isInValidLogin = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    this.authService.authenticate(this.username, this.password).subscribe(res => {
      if (res.accessToken) {
          Swal.fire({
            type: 'success',
            title: 'Successfully Logged in',
            timer: 2000,
          })
          this.router.navigate(['/dashboard']);
      } else {
        Swal.fire({
          type: 'error',
          title: 'Invalid Credentials',
          timer: 2000,
        });
      }
    });
 /*
   if (this.authService.authenticate(this.username, this.password)) {
      this.router.navigate(['dashboard']);
      this.isInValidLogin = false;
    } else {
     this.isInValidLogin = false;
   }*/
 /*   this.authService.login(this.email, this.password)
      .then(res => {
        Swal.fire({
          type: 'success',
          title: 'Successfully Logged in',
          timer: 2000,
        })
          this.router.navigate(['/dashboard']);
        })
      .catch(err => {
        Swal.fire({
          type: 'error',
          title: err.message,
          timer: 2000,
        });
      });*/
  }
  ngOnInit() {
/*    this.authService.getAuth()
      .subscribe(auth => {
        if (auth) {
          this.router.navigate(['/dashboard']);
        }
      });*/
  }
}
