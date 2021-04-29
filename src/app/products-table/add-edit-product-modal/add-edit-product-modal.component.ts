import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {iif} from 'rxjs';
import {map, switchMap, take, tap} from 'rxjs/operators';

import {ProductService} from '../../core/services/product.service';
import {ModalActionType, Owner, Product} from '../../shared/models';
import {ModalActionTypes} from '../../shared/consts/modal-action-types';
import {OwnerService} from '../../core/services/owner.service';


@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-edit-product-modal.component.html',
  styleUrls: ['./add-edit-product-modal.component.scss']
})
export class AddEditProductModalComponent implements OnInit {
  actionType: ModalActionType;
  product: Product;
  owner: Owner;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { modalActionType: ModalActionType, id?: number },
    public dialogRef: MatDialogRef<AddEditProductModalComponent>,
    private productService: ProductService,
    private ownerService: OwnerService
  ) { }

  ngOnInit(): void {
    this.actionType = this.data.modalActionType;

    this.productService.setSelectedId(this.data.id);

    this.productService.selectedProduct$
      .pipe(
        take(1),
        tap(product => this.product = product),
        switchMap(() => iif(() => this.actionType === ModalActionTypes.EDIT,
          this.ownerService.owners$.pipe(
            map(owners => owners.find(owner => owner.id === this.product.ownerId)),
            take(1)
          ),
          this.ownerService.defaultOwner$
        )),
        tap(owner => this.owner = owner as Owner)
      ).subscribe(() => {});

    this.buildForm();
  }

  save(): void {
    const product = {
      ...this.product,
      owner: { ...this.owner },
      ownerId: this.owner.id,
      ...this.form.value
    };
    if (this.actionType === ModalActionTypes.EDIT) {
      this.productService.editProduct(product);
    } else {
      this.productService.addProduct(product);
    }
    this.close();
  }

  close(): void {
    this.productService.setSelectedId(null);
    this.dialogRef.close();
  }

  private buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(0)]),
      count: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)])
    });
    this.form.patchValue(this.product);
  }
}
