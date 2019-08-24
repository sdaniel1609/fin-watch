import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {LoaderService} from './loader.service';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(public loaderService: LoaderService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token')
        }
      });
    }
    if (req.url.indexOf('intrinio')) {
      this.loaderService.show();
      const newRequest = req.clone({
        headers: req.headers.set(
          'Authorization', 'Bearer' + ' OjRiMDc0MTFmNTA0YWNlNDUzZTJmNGQwMTRkNjA1ODJm'
        )
      });
      return next.handle(newRequest);
      finalize(() => this.loaderService.hide());
    }
    return next.handle(req);
  }
}
