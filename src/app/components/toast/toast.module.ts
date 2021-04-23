import {NgModule} from '@angular/core';
import {ToastComponent} from './toast.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    ToastComponent
  ],
  exports: [
    ToastComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ToastModule { }
