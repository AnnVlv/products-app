import {Injectable} from '@angular/core';
import {Observable, Subject, timer} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message$: Observable<string>;
  private readonly time = 3000;
  private showMessageEvent$: Subject<string> = new Subject<string>();

  constructor() {
    this.message$ = this.showMessageEvent$
      .asObservable()
      .pipe(
        map(message => [message, '']),
        switchMap(values => {
          const messages = values;
          return timer(0, this.time).pipe(
            map((_, i) => messages[i]),
            take(2)
          );
        })
      );
  }

  show(message: string): void {
    this.showMessageEvent$.next(message);
  }
}
