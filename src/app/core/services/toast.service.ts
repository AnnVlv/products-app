import {Injectable} from '@angular/core';
import {Observable, of, Subject, timer} from 'rxjs';
import {debounceTime, map, repeatWhen, switchMap, take, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message$: Observable<string>;
  message = '';
  private readonly time = 3000;
  private showMessageEvent$: Subject<string> = new Subject<string>();

  constructor() {
    this.showMessageEvent$.pipe(
      tap(message => this.message = message),
      debounceTime(this.time)
    ).subscribe(() => this.message = '');

    this.message$ = of(this.message).pipe(
      repeatWhen(() => this.showMessageEvent$),
      switchMap(() => timer(0, this.time).pipe(
        map(() => this.message),
        take(2))
      )
    );
  }

  show(message: string): void {
    this.showMessageEvent$.next(message);
  }
}
