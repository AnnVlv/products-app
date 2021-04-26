import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from './material/material.module';
import {ToastModule} from './components/toast/toast.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastModule
  ]
})
export class SharedModule { }
