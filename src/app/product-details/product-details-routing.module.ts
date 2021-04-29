import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProductDetailsComponent} from './product-details.component';
import {ProductResolver} from '../core/resolvers/product.resolver';


const routes: Routes = [
  {
    path: '',
    component: ProductDetailsComponent,
    resolve: { product: ProductResolver }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductDetailsRoutingModule { }
