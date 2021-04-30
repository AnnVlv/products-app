import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {IRequest} from 'ngxs-requests-plugin';

import {ProductStateGetter} from '../../state/product/product.getter';
import {Product} from '../../shared/models';
import {AddProduct, DeleteProduct, EditProduct, GetProductById, GetProducts} from '../../state/product/product.actions';
import {
  ProductDeleteRequestState,
  ProductGetRequestState,
  ProductPostRequestState,
  ProductPutRequestState,
  ProductsGetRequestState
} from '../../state/product/poduct.state';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  @Select(ProductStateGetter.products) products$: Observable<Product[]>;
  @Select(ProductStateGetter.total) total$: Observable<number>;
  @Select(ProductStateGetter.selectedProduct) selectedProduct$: Observable<Product>;

  @Select(ProductsGetRequestState) productsGetRequestState$: Observable<IRequest>;
  @Select(ProductGetRequestState) productGetRequestState$: Observable<IRequest>;
  @Select(ProductPostRequestState) productPostRequestState$: Observable<IRequest>;
  @Select(ProductPutRequestState) productPutRequestState$: Observable<IRequest>;
  @Select(ProductDeleteRequestState) productDeleteRequestState$: Observable<IRequest>;

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
