import {Injectable} from '@angular/core';
import {Subject, timer} from 'rxjs';
import {filter, repeatWhen, withLatestFrom} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message$: Subject<string> = new Subject<string>();

  constructor() {
    timer(3000).pipe(
      repeatWhen(() => this.message$),
      withLatestFrom(this.message$),
      filter(([_, message]) => !!message)
    ).subscribe(() => {
      this.message$.next('');
    });
  }

  show(message: string): void {
    this.message$.next(message);
  }
}
