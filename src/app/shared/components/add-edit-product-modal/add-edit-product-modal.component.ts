import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {iif, Subscription} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

import {ProductService} from '../../../core/services/product.service';
import {ModalActionType, Owner, Product} from '../../models';
import {ModalActionTypes} from '../../enums/modal-action-types';
import {OwnerService} from '../../../core/services/owner.service';


@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-edit-product-modal.component.html',
  styleUrls: ['./add-edit-product-modal.component.scss']
})
export class AddEditProductModalComponent implements OnInit, OnDestroy {
  actionType: ModalActionType;
  product: Product;
  owner: Owner;
  form: FormGroup;
  private subscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { modalActionType: ModalActionType, id?: number },
    public dialogRef: MatDialogRef<AddEditProductModalComponent>,
    private productService: ProductService,
    private ownerService: OwnerService
  ) { }

  ngOnInit(): void {
    this.actionType = this.data.modalActionType;

    this.productService.setSelectedId(this.data.id);

    this.subscription = iif(() => this.actionType === ModalActionTypes.EDIT,
      this.productService.selectedProduct$.pipe(
        tap(product => this.product = product),
        switchMap(() => this.ownerService.owners$.pipe(
          map(owners => owners.find(owner => owner.id === this.product.ownerId)),
          tap(owner => this.owner = owner)
        ))
      ),
      this.ownerService.defaultOwner$.pipe(
        tap(owner => this.owner = owner)
      )
    ).subscribe(() => { });

    this.buildForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
