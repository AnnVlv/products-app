import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

import {ProductsService} from '../../core/services/products.service';
import {OWNER_INFO} from '../../state/products/poducts.state';


@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss']
})
export class AddProductModalComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddProductModalComponent>,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  add(): void {
    this.productsService.addProduct({ ...this.form.value, ...OWNER_INFO });
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  private buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl('Name Example', Validators.required),
      description: new FormControl('Description Example', Validators.required),
      price: new FormControl(120, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(0)]),
      count: new FormControl(1, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)])
    });
  }
}
