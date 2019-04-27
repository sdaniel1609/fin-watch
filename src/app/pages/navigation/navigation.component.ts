import {Component, OnDestroy, ChangeDetectorRef, ViewEncapsulation, inject, Inject} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnDestroy {

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private localStorage: LocalStorageService) {
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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


}

