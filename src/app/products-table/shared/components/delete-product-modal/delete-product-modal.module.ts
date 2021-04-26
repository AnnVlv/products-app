import {NgModule} from '@angular/core';

import {DeleteProductModalComponent} from './delete-product-modal.component';
import {SharedModule} from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    DeleteProductModalComponent
  ],
  imports: [
    SharedModule
  ]
})
export class DeleteProductModalModule { }
