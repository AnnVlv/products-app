import {NgModule} from '@angular/core';

import {AddEditProductModalComponent} from './add-edit-product-modal.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    AddEditProductModalComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AddEditProductModalModule { }
