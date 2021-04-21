import {NgModule} from '@angular/core';
import {ProductsTableComponent} from './products-table.component';
import {SharedModule} from '../../shared/shared.module';
import {DeleteProductModalComponent} from './delete-product-modal/delete-product-modal.component';
import {AddProductModalComponent} from './add-product-modal/add-product-modal.component';
import {ProductsTableRoutingModule} from './products-table-routing.module';


@NgModule({
  declarations: [
    ProductsTableComponent,
    DeleteProductModalComponent,
    AddProductModalComponent
  ],
  imports: [
    SharedModule,
    ProductsTableRoutingModule
  ]
})
export class ProductsTableModule { }
