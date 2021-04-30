import {NgModule} from '@angular/core';

import {NgxsModule} from '@ngxs/store';
import {NgxsRequestsPluginModule} from 'ngxs-requests-plugin';

import {environment} from '../../environments/environment';
import {
  ProductGetRequestState,
  ProductPostRequestState,
  ProductPutRequestState,
  ProductsGetRequestState,
  ProductState
} from './product/poduct.state';
import {OwnerState} from './owner/owner.state';
import {ProductDeleteRequestState} from './product/product-delete-request.state';


@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forRoot([
      ProductState,
      OwnerState
    ], {
      developmentMode: !environment.production
    }),
    NgxsRequestsPluginModule.forRoot([
      ProductsGetRequestState,
      ProductGetRequestState,
      ProductPostRequestState,
      ProductPutRequestState,
      ProductDeleteRequestState
    ])
  ],
  exports: [
    NgxsModule
  ]
})
export class StateModule { }
