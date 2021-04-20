import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsTableComponent} from './components/products-table/products-table.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';


const routes: Routes = [
  { path: '', component: ProductsTableComponent },
  { path: ':id', component:  ProductDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
