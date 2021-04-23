import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastService} from '../toast.service';


const BASE_URL = `http://localhost:3000`;

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newRequest = new HttpRequest(request.method as any, `${BASE_URL}/${request.url}`);
    return next.handle(newRequest)
      .pipe(catchError((error) => {
        this.toastService.show(`Something went wrong`);
        return throwError(error.message);
      }));
  }
}
