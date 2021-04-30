import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddEditProductModalComponent} from './add-edit-product-modal.component';
import {MaterialModule} from '../../material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AddEditProductModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    AddEditProductModalComponent
  ]
})
export class AddEditProductModalModule { }
