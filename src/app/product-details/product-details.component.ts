import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {Observable} from 'rxjs';

import {Product} from '../shared/models';
import {ProductService} from '../core/services/product.service';
import {ModalActionTypes} from '../shared/consts/modal-action-types';
import {AddEditProductModalComponent} from '../shared/components/add-edit-product-modal/add-edit-product-modal.component';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product$: Observable<Product>;
  productsKeysToShow: string[] = ['name', 'description', 'price', 'count', 'total'];

  constructor(
    private productsService: ProductService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.product$ = this.productsService.selectedProduct$;
  }

  openEditModal(id: number): void {
    this.dialog.open(AddEditProductModalComponent, {
      width: '400px',
      data: {
        modalActionType: ModalActionTypes.EDIT,
        id
      }
    });
  }
}
