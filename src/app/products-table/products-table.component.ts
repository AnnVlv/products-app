import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Observable, Subscription} from 'rxjs';
import {Select, Store} from '@ngxs/store';

import {AddProduct, DeleteProduct, GetProducts} from '../state/products/product.actions';
import {Product} from '../shared/models';
import {ProductsStateGetter} from '../state/products/products.getter';
import {OWNER_INFO} from '../core/services/products.service';
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
  isReady = false;
  displayedColumns: string[] = ['name', 'description', 'price', 'count', 'total', 'delete'];
  subs: Subscription[] = [];

  @Select(ProductsStateGetter.products) products$!: Observable<Product[]>;
  @Select(ProductsStateGetter.total) total$!: Observable<number>;

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.subscribeOnState();
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  openDeleteModal(id: number): void {
    const dialogRef = this.dialog.open(DeleteProductModalComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isReady = false;
        const sub = this.store
          .dispatch(new DeleteProduct(id))
          .subscribe(() => this.isReady = true);
        this.subs.push(sub);
      }
    });
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(AddProductModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isReady = false;
        const sub = this.store
          .dispatch(new AddProduct({ ...result, ...OWNER_INFO }))
          .subscribe(() => this.isReady = true);
        this.subs.push(sub);
      }
    });
  }

  openDetailsPage(id: number): void {
    this.router.navigate(['/', id]);
  }

  showError(): void {
    this.toastService.show(`Showing error... # ${ Math.round(Math.random() * 100) }`);
  }

  private subscribeOnState(): void {
    const sub = this.products$
      .subscribe(products => this.products = products);
    this.subs.push(sub);
  }

  private getProducts(): void {
    const sub = this.store
      .dispatch(new GetProducts())
      .subscribe(() => this.isReady = true);
    this.subs.push(sub);
  }
}
