import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AddProduct, DeleteProduct, GetProducts} from '../../state/products/product.actions';
import {Observable, Subscription} from 'rxjs';
import {Product} from '../../models';
import {MatDialog} from '@angular/material/dialog';
import {DeleteProductModalComponent} from './delete-product-modal/delete-product-modal.component';
import {AddProductModalComponent} from './add-product-modal/add-product-modal.component';
import {Router} from '@angular/router';
import {ProductsState} from '../../state/products/poducts.state';


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

  @Select(ProductsState.products) products$!: Observable<Product[]>;
  @Select(ProductsState.total) total$!: Observable<number>;

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private router: Router
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
          .dispatch(new AddProduct(result))
          .subscribe(() => this.isReady = true);
        this.subs.push(sub);
      }
    });
  }

  openDetailsPage(id: number): void {
    this.router.navigate(['/', id]);
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
