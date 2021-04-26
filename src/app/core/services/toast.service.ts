import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime, filter} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message$: Subject<string> = new Subject<string>();

  constructor() {
    this.message$.pipe(
      filter(message => !!message),
      debounceTime(3000)
    ).subscribe(() => {
      this.message$.next('');
    });
  }

  show(message: string): void {
    this.message$.next(message);
  }
}
