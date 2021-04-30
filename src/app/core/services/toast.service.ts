import {Injectable} from '@angular/core';

import {merge, Observable, Subject, timer} from 'rxjs';
import {mapTo, switchMapTo} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message$: Observable<string>;
  private readonly time = 3000;
  private showMessageEvent$: Subject<string> = new Subject<string>();

  constructor() {
    this.message$ = merge(
      this.showMessageEvent$,
      this.showMessageEvent$.pipe(
        switchMapTo(
          timer(this.time).pipe(
            mapTo(null),
          ),
        ),
      ),
    );
  }

  show(message: string): void {
    this.showMessageEvent$.next(message);
  }
}
