import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShowSpinnerDirective} from './show-spinner.directive';


@NgModule({
  declarations: [
    ShowSpinnerDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ShowSpinnerDirective,
  ],
})
export class ShowSpinnerModule { }
