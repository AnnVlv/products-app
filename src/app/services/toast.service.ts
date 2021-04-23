import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription, timer} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private sub: Subscription;

  show(message: string, time: number = 2000): void {
    this.message$.next(message);
    this.sub = timer(time).subscribe(() => {
      this.hide();
    });
  }

  private hide(): void {
    this.message$.next('');
    this.sub.unsubscribe();
  }
}
