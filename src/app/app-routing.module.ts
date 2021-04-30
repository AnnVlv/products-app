import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./products-table/products-table.module')
      .then(m => m.ProductsTableModule),
  },
  {
    path: ':id',
    loadChildren: () => import('./product-details/product-details.module')
      .then(m => m.ProductDetailsModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
