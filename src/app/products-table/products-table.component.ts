import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Observable, Subject, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

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
  total$: Observable<number>;
  isLoading$: Observable<boolean>;
  deleteModal$: Subject<any> = new Subject<any>();

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private toastService: ToastService,
    private productsProviderService: ProductsProviderService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = ProductsService.isLoading$;
    this.total$ = this.productsProviderService.total$;

    this.subscription = this.productsProviderService.products$
      .subscribe(products => this.products = products);

    this.productsProviderService.getProducts();

    this.deleteModal$.pipe(
      switchMap(closed => closed)
    ).subscribe(() => {
      // after closed
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openDeleteModal(id: number): void {
    const dialogRef = this.dialog.open(DeleteProductModalComponent, {
      width: '250px',
      data: id
    });
    this.deleteModal$.next(dialogRef.afterClosed());
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
