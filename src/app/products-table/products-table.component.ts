import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {Observable} from 'rxjs';
import {Select} from '@ngxs/store';

import {Product} from '../shared/models';
import {ToastService} from '../core/services';
import {DeleteProductModalComponent} from './delete-product-modal/delete-product-modal.component';
import {AddProductModalComponent} from './add-product-modal/add-product-modal.component';
import {ProductsService} from '../core/services/products.service';
import {ProductsStateGetter} from '../state/products/products.getter';


@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'price', 'count', 'total', 'delete'];
  total$: Observable<number>;
  products$: Observable<Product[]>;
  isLoading$: Observable<boolean>;

  @Select(ProductsStateGetter.products) products$4!: Observable<Product[]>;

  constructor(
    private dialog: MatDialog,
    private toastService: ToastService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.total$ = this.productsService.total$;
    this.products$ = this.productsService.products$;
  }

  openDeleteModal(id: number): void {
    this.dialog.open(DeleteProductModalComponent, {
      width: '250px',
      data: id
    });
  }

  openAddModal(): void {
    this.dialog.open(AddProductModalComponent, {
      width: '400px'
    });
  }

  showError(): void {
    this.toastService.show(`Showing error... # ${ Math.round(Math.random() * 100) }`);
  }
}
