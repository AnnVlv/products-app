import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Observable, Subscription} from 'rxjs';
import {Select, Store} from '@ngxs/store';

import {AddProduct, DeleteProduct, GetProducts} from '../state/products/product.actions';
import {Product} from '../shared/models';
import {ProductsStateGetter} from '../state/products/products.getter';
import {OWNER_INFO, ProductsService} from '../core/services/products.service';
import {ToastService} from '../core/services';
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

  @Select(ProductsStateGetter.products) products$!: Observable<Product[]>;
  @Select(ProductsStateGetter.total) total$!: Observable<number>;

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = ProductsService.isLoading$;

    this.subscription = this.products$
      .subscribe(products => this.products = products);

    this.store.dispatch(new GetProducts());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openDeleteModal(id: number): void {
    const dialogRef = this.dialog.open(DeleteProductModalComponent, {
      width: '250px'
    });

    const sub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeleteProduct(id));
      }
      sub.unsubscribe();
    });
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(AddProductModalComponent, {
      width: '400px'
    });

    const sub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new AddProduct({ ...result, ...OWNER_INFO }));
      }
      sub.unsubscribe();
    });
  }

  openDetailsPage(id: number): void {
    this.router.navigate(['/', id]);
  }

  showError(): void {
    this.toastService.show(`Showing error... # ${ Math.round(Math.random() * 100) }`);
  }
}
