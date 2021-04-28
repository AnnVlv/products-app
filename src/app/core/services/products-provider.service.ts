import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';

import {ProductsStateGetter} from '../../state/products/products.getter';
import {Product} from '../../shared/models';
import {AddProduct, DeleteProduct, EditProduct, GetProductById, GetProducts} from '../../state/products/product.actions';


@Injectable({
  providedIn: 'root'
})
export class ProductsProviderService {
  @Select(ProductsStateGetter.products) products$!: Observable<Product[]>;
  @Select(ProductsStateGetter.total) total$!: Observable<number>;

  constructor(private store: Store) { }

  getProducts(): void {
    this.store.dispatch(new GetProducts());
  }

  getProductById(id: number): void {
    this.store.dispatch(new GetProductById(id));
  }

  addProduct(product: Product): void {
    this.store.dispatch(new AddProduct(product));
  }

  editProduct(product: Product): void {
    this.store.dispatch(new EditProduct(product));
  }

  deleteProduct(id: number): void {
    this.store.dispatch(new DeleteProduct(id));
  }
}
