import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoaderService} from './loader.service';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(public loaderService: LoaderService) { }

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    const newRequest = req.clone({
      headers: req.headers.set(
        'Authorization', 'Bearer' + ' OmEyODA1YTFkNTY4Y2M5YTkzNDA4M2ViMjJlMmE5NzEw'
      )
    });
    return next.handle(newRequest);
    finalize(() => this.loaderService.hide());
  }
}


