import {NgModule} from '@angular/core';

import {AddProductModalModule} from './components/add-product-modal/add-product-modal.module';
import {DeleteProductModalModule} from './components/delete-product-modal/delete-product-modal.module';


@NgModule({
  imports: [
    AddProductModalModule,
    DeleteProductModalModule
  ],
  exports: [
    AddProductModalModule,
    DeleteProductModalModule
  ]
})
export class ProductsTableSharedModule { }
