import {NgModule} from '@angular/core';

import {AddProductModalComponent} from './add-product-modal.component';
import {SharedModule} from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    AddProductModalComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AddProductModalModule { }
