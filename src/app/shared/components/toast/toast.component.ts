import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import {ToastService} from '../../../core/services';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  message$: Observable<string>;

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.message$ = this.toastService.message$;
  }
}
