import {NgModule} from '@angular/core';
import {ProductDetailsComponent} from './product-details.component';
import {SharedModule} from '../../shared/shared.module';
import {ProductDetailsRoutingModule} from './product-details-routing.module';


@NgModule({
  declarations: [
    ProductDetailsComponent
  ],
  imports: [
    SharedModule,
    ProductDetailsRoutingModule
  ]
})
export class ProductDetailsModule { }
