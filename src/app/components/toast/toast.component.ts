import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ToastService} from '../../services/toast.service';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  message: string;

  constructor(
    public toastService: ToastService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.toastService.message$.subscribe(message => {
      this.message = message;
      this.changeDetectorRef.detectChanges();
    });
  }
}
