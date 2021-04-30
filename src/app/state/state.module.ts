import {NgModule} from '@angular/core';

import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsRequestsPluginModule} from 'ngxs-requests-plugin';

import {environment} from '../../environments/environment';
import {
  ProductGetRequestState,
  ProductPostRequestState,
  ProductPutRequestState,
  ProductsGetRequestState,
  ProductDeleteRequestState,
  ProductState
} from './product/poduct.state';
import {OwnerState} from './owner/owner.state';


@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forRoot([
      ProductState,
      OwnerState,
    ], {
      developmentMode: !environment.production
    }),
    NgxsRequestsPluginModule.forRoot([
      ProductsGetRequestState,
      ProductGetRequestState,
      ProductPostRequestState,
      ProductPutRequestState,
      ProductDeleteRequestState,
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  exports: [
    NgxsModule,
  ],
})
export class StateModule { }
