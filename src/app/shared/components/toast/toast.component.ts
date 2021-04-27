import {Component, OnInit} from '@angular/core';

import {ToastService} from '../../../core/services';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  message$: Observable<string>;

  constructor(
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.message$ = this.toastService.message$;
  }
}
