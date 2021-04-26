import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  showMessageEvent$: Subject<string> = new Subject<string>();
  message$: Subject<string> = new Subject<string>();

  constructor() {
    this.showMessageEvent$.pipe(
      tap(message => this.message$.next(message)),
      debounceTime(3000)
    ).subscribe(_ => this.message$.next(''));
  }

  show(message: string): void {
    this.showMessageEvent$.next(message);
  }
}
