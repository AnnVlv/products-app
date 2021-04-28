import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProductsResolver} from './core/resolvers/products.resolver';
import {ProductResolver} from './core/resolvers/product.resolver';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./products-table/products-table.module')
      .then(m => m.ProductsTableModule),
    resolve: { data: ProductsResolver }
  },
  {
    path: ':id',
    loadChildren: () => import('./product-details/product-details.module')
      .then(m => m.ProductDetailsModule),
    resolve: { data: ProductResolver }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
