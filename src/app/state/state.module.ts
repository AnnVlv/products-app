import {NgModule} from '@angular/core';

import {NgxsModule} from '@ngxs/store';

import {environment} from '../../environments/environment';
import {ProductState} from './product/poduct.state';
import {OwnerState} from './owner/owner.state';


@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forRoot([
      ProductState,
      OwnerState
    ], {
      developmentMode: !environment.production
    })
  ],
  exports: [
    NgxsModule
  ]
})
export class StateModule { }
