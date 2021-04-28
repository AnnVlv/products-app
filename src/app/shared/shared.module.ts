import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from './material/material.module';
import {ToastModule} from './components/toast/toast.module';
import {SpinnerModule} from './components/spinner/spinner.module';
import {ShowSpinnerModule} from './directives/show-spinner/show-spinner.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastModule,
    SpinnerModule,
    ShowSpinnerModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastModule,
    SpinnerModule,
    ShowSpinnerModule
  ]
})
export class SharedModule { }
