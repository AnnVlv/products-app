import {NgModule} from '@angular/core';

import {ProductsTableComponent} from './products-table.component';
import {ProductsTableRoutingModule} from './products-table-routing.module';
import {SharedModule} from '../shared/shared.module';
import {DeleteProductModalModule} from './delete-product-modal/delete-product-modal.module';


@NgModule({
  declarations: [
    ProductsTableComponent,
  ],
  imports: [
    SharedModule,
    ProductsTableRoutingModule,
    DeleteProductModalModule,
  ],
})
export class ProductsTableModule { }
