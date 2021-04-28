import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';

import {ProductsStateGetter} from '../../state/products/products.getter';
import {Product, StateModel} from '../../shared/models';
import {AddProduct, DeleteProduct, EditProduct, GetProductById, GetProducts} from '../../state/products/product.actions';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  @Select(ProductsStateGetter.products) products$!: Observable<Product[]>;
  @Select(ProductsStateGetter.total) total$!: Observable<number>;

  constructor(private store: Store) { }

  getProducts(): Observable<StateModel> {
    return this.store.dispatch(new GetProducts());
  }

  getProductById(id: number): Observable<StateModel> {
    return this.store.dispatch(new GetProductById(id));
  }

  addProduct(product: Product): Observable<StateModel> {
    return this.store.dispatch(new AddProduct(product));
  }

  editProduct(product: Product): Observable<StateModel> {
    return this.store.dispatch(new EditProduct(product));
  }

  deleteProduct(id: number): Observable<StateModel> {
    return this.store.dispatch(new DeleteProduct(id));
  }
}
