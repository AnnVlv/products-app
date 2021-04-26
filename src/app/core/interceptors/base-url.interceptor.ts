import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {ToastService} from '../services';


@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  BASE_URL = environment.BASE_URL;

  constructor(private toastService: ToastService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newRequest = request.clone({
      url: `${ this.BASE_URL }/${ request.url }`
    });
    return next.handle(newRequest)
      .pipe(catchError((error) => {
        this.toastService.show(`Something went wrong`);
        return throwError(error.message);
      }));
  }
}
