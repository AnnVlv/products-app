import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {Observable} from 'rxjs';

import {Product} from '../shared/models';
import {ToastService} from '../core/services';
import {DeleteProductModalComponent} from './delete-product-modal/delete-product-modal.component';
import {AddProductModalComponent} from './add-product-modal/add-product-modal.component';
import {ProductsState} from '../state/products/poducts.state';
import {ProductsService} from '../core/services/products.service';


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

  constructor(
    private dialog: MatDialog,
    private toastService: ToastService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = ProductsState.isLoading$;
    this.total$ = this.productsService.total$;
    this.products$ = this.productsService.products$;

    this.productsService.getProducts();
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
