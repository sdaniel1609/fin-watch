import {Component, OnDestroy, ChangeDetectorRef, ViewEncapsulation, inject, Inject, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../model/User';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnDestroy, OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private localStorage: LocalStorageService,
    private authService: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  searchInstrument(): void {
    Swal.fire({
      inputPlaceholder: 'Enter a symbol or a keyword',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      backdrop: `rgba(0,0,123,0.4)`,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        this.localStorage.addCompany(result.value);
       this.router.navigate(['/company-lookup', result.value]);
      }
    });
  }

  onLogoutClick(): void {
    this.authService.logout();
    window.location.reload();
    this.router.navigate(['/login']);
    Swal.fire({
      type: 'success',
      title: 'Successfully Logged Out',
      timer: 1000,
    });
  }
  ngOnInit(): void {
    this.authService.getAuth()
      .subscribe(auth => {
        if (auth) {
          this.isLoggedIn = true;
          this.loggedInUser = auth.email;
        } else {
          this.isLoggedIn = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


}

