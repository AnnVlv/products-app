import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from './material/material.module';
import {ToastModule} from './components/toast/toast.module';
import {SpinnerModule} from './components/spinner/spinner.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastModule,
    SpinnerModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastModule,
    SpinnerModule
  ]
})
export class SharedModule { }
