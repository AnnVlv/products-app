import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxsModule} from '@ngxs/store';
import {ProductsState} from './poduct.state';
import {environment} from '../../environments/environment';


@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forRoot([ProductsState], {
      developmentMode: !environment.production
    })
  ],
  exports: [
    NgxsModule
  ]
})
export class StateModule { }
