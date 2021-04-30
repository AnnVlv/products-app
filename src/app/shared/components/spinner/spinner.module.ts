import {NgModule} from '@angular/core';

import {SpinnerComponent} from './spinner.component';
import {MaterialModule} from '../../material/material.module';


@NgModule({
  declarations: [
    SpinnerComponent,
  ],
  imports: [
    MaterialModule,
  ],
  exports: [
    SpinnerComponent,
  ],
})
export class SpinnerModule { }
