import {NgModule} from '@angular/core';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../../environments/environment';
import {ProductsState} from './products/poducts.state';
import {OwnersState} from './owners/owners.state';


@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forRoot([
      ProductsState,
      OwnersState
    ], {
      developmentMode: !environment.production
    })
  ],
  exports: [
    NgxsModule
  ]
})
export class StateModule { }
