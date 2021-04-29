import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Select, Store} from '@ngxs/store';

import {ProductStateGetter} from '../../state/product/product.getter';
import {Product} from '../../shared/models';
import {AddProduct, DeleteProduct, EditProduct, GetProductById, GetProducts, SetSelectedId} from '../../state/product/product.actions';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  @Select(ProductStateGetter.products) products$: Observable<Product[]>;
  @Select(ProductStateGetter.total) total$: Observable<number>;
  @Select(ProductStateGetter.selectedProduct) selectedProduct$: Observable<Product>;

  constructor(private store: Store) { }

  setSelectedId(id: number): void {
    this.store.dispatch(new SetSelectedId(id));
  }

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
