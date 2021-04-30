import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {Observable} from 'rxjs';

import {Product} from '../shared/models';
import {ToastService} from '../core/services';
import {DeleteProductModalComponent} from './delete-product-modal/delete-product-modal.component';
import {AddEditProductModalComponent} from '../shared/components/add-edit-product-modal/add-edit-product-modal.component';
import {ProductService} from '../core/services/product.service';


@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'price', 'count', 'total', 'edit', 'delete'];
  total$: Observable<number>;
  products$: Observable<Product[]>;

  constructor(
    private dialog: MatDialog,
    private toastService: ToastService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.total$ = this.productService.total$;
    this.products$ = this.productService.products$;
  }

  openDeleteModal(id: number): void {
    this.dialog.open(DeleteProductModalComponent, {
      width: '250px',
      data: id,
    });
  }

  openAddEditModal(product?: Product): void {
    this.dialog.open(AddEditProductModalComponent, {
      width: '400px',
      data: product,
    });
  }

  showError(): void {
    this.toastService.show(`Showing error... # ${Math.round(Math.random() * 100)}`);
  }
}
