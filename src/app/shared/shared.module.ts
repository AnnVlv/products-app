import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from './material/material.module';
import {ToastModule} from './components/toast/toast.module';
import {SpinnerModule} from './components/spinner/spinner.module';
import {ShowSpinnerModule} from './directives/show-spinner/show-spinner.module';
import {AddEditProductModalModule} from './components/add-edit-product-modal/add-edit-product-modal.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastModule,
    SpinnerModule,
    ShowSpinnerModule,
    AddEditProductModalModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastModule,
    SpinnerModule,
    ShowSpinnerModule,
    AddEditProductModalModule
  ]
})
export class SharedModule { }
