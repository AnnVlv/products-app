import {NgModule} from '@angular/core';
import {ProductsTableComponent} from './products-table.component';
import {SharedModule} from '../../shared/shared.module';
import {DeleteProductModalComponent} from '../product-details/delete-product-modal/delete-product-modal.component';
import {AddProductModalComponent} from '../product-details/add-product-modal/add-product-modal.component';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ProductsTableComponent
  }
];

@NgModule({
  declarations: [
    ProductsTableComponent,
    DeleteProductModalComponent,
    AddProductModalComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductsTableModule { }
