import {NgModule} from '@angular/core';

import {ProductsTableComponent} from './products-table.component';
import {ProductsTableRoutingModule} from './products-table-routing.module';
import {ProductsTableSharedModule} from './shared/products-table-shared.module';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    ProductsTableComponent,
  ],
  imports: [
    SharedModule,
    ProductsTableRoutingModule,
    ProductsTableSharedModule
  ]
})
export class ProductsTableModule { }
