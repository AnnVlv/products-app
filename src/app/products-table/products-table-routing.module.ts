import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProductsTableComponent} from './products-table.component';
import {ProductsResolver} from '../core/resolvers/products.resolver';


const routes: Routes = [
  {
    path: '',
    component: ProductsTableComponent,
    resolve: {
      products: ProductsResolver
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ProductsTableRoutingModule { }
