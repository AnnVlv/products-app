import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {AddEditProductModalComponent} from './add-edit-product-modal.component';
import {MaterialModule} from '../../material/material.module';


@NgModule({
  declarations: [
    AddEditProductModalComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    AddEditProductModalComponent,
  ],
})
export class AddEditProductModalModule { }
