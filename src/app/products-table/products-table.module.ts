import {NgModule} from '@angular/core';

import {ProductsTableComponent} from './products-table.component';
import {ProductsTableRoutingModule} from './products-table-routing.module';
import {SharedModule} from '../shared/shared.module';
import {AddProductModalModule} from './shared/components/add-product-modal/add-product-modal.module';
import {DeleteProductModalModule} from './shared/components/delete-product-modal/delete-product-modal.module';


@NgModule({
  declarations: [
    ProductsTableComponent
  ],
  imports: [
    SharedModule,
    ProductsTableRoutingModule,
    AddProductModalModule,
    DeleteProductModalModule
  ]
})
export class ProductsTableModule { }
