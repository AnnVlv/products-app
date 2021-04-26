import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime, filter, withLatestFrom} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message$: Subject<string> = new Subject<string>();
  private clear$: Subject<null> = new Subject<null>();

  constructor() {
    this.clear$.pipe(
      withLatestFrom(this.message$),
      filter(([_, message]) => !!message),
      debounceTime(3000)
    ).subscribe(() => {
      this.message$.next('');
    });
  }

  show(message: string): void {
    this.message$.next(message);
    this.clear$.next();
  }
}
