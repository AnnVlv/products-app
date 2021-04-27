import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Observable, Subscription} from 'rxjs';

import {Product} from '../shared/models';
import {ProductsService} from '../core/services';
import {ToastService} from '../core/services';
import {ProductsProviderService} from '../core/services/state-providers';
import {DeleteProductModalComponent} from './shared/components/delete-product-modal/delete-product-modal.component';
import {AddProductModalComponent} from './shared/components/add-product-modal/add-product-modal.component';


@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  displayedColumns: string[] = ['name', 'description', 'price', 'count', 'total', 'delete'];
  subscription: Subscription;
  isLoading$: Observable<boolean>;

  get products$(): Observable<Product[]> {
    return this.productsProviderService.products$;
  }

  get total$(): Observable<number> {
    return this.productsProviderService.total$;
  }

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private toastService: ToastService,
    private productsProviderService: ProductsProviderService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = ProductsService.isLoading$;

    this.subscription = this.products$
      .subscribe(products => this.products = products);

    this.productsProviderService.getProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  openDetailsPage(id: number): void {
    this.router.navigate(['/', id]);
  }

  showError(): void {
    this.toastService.show(`Showing error... # ${ Math.round(Math.random() * 100) }`);
  }
}
