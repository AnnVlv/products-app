import {NgModule} from '@angular/core';
import {ProductDetailsComponent} from './product-details.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ProductDetailsComponent
  }
];

@NgModule({
  declarations: [
    ProductDetailsComponent,

  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductDetailsModule { }
