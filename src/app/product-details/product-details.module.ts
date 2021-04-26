import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {ProductDetailsComponent} from './product-details.component';
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
