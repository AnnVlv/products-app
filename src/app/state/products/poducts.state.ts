import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject, Observable} from 'rxjs';
import {catchError, delay, switchMap, tap} from 'rxjs/operators';
import {Action, State, StateContext} from '@ngxs/store';

import {
  AddProduct,
  DeleteProduct,
  DeleteProductFail,
  DeleteProductSuccess,
  EditProduct,
  GetProductById,
  GetProducts,
  SetProducts
} from './product.actions';
import {Owner, Product, ProductsStateModel} from '../../shared/models';
import {SetOwners} from '../owners/owners.actions';


export const OWNER_INFO = {
  ownerId: 2,
  owner: {
    id: 2,
    name: 'Owner'
  }
};

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    productsIds: [],
    products: {}
  }
})
@Injectable()
export class ProductsState {
  static isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private URL = `products`;

  constructor(
    private httpClient: HttpClient
  ) { }

  @Action(SetProducts)
  setProducts(ctx: StateContext<ProductsStateModel>, { products }: SetProducts): void {
    const state = ctx.getState();

    const productsIds = [...new Set([
      ...products.map(product => product.id),
      ...state.productsIds
    ])];

    const { owners, newProducts } = products.reduce<{
      owners: Owner[],
      newProducts: ProductsStateModel['products']
    }>((acc, product) => {
      const { owner, ...newProduct } = product;
      return {
        owners: [
          ...acc.owners,
          owner
        ],
        newProducts: {
          ...acc.newProducts,
          [newProduct.id]: {
            ...newProduct,
            total: product.price * product.count
          }
        }
      };
    }, {
      owners: [],
      newProducts: {}
    });

    ctx.patchState({
      productsIds,
      products: {
        ...state.products,
        ...newProducts
      }
    });

    ctx.dispatch(new SetOwners(owners));
  }

  @Action(GetProducts)
  getProducts(ctx: StateContext<ProductsStateModel>): Observable<void> {
    this.emitLoadingStart();
    return this.httpClient.get<Product[]>(this.URL).pipe(
      delay(400),
      tap(() => this.emitLoadingEnd()),
      switchMap(products => ctx.dispatch(new SetProducts(products)))
    );
  }

  @Action(GetProductById)
  getProductById(ctx: StateContext<ProductsStateModel>, { id }: GetProductById): Observable<void> {
    this.emitLoadingStart();
    return this.httpClient.get<Product>(`${ this.URL }/${ id }`).pipe(
      delay(400),
      tap(() => this.emitLoadingEnd()),
      switchMap(product => ctx.dispatch(new SetProducts([product])))
    );
  }

  @Action(AddProduct)
  addProduct(ctx: StateContext<ProductsStateModel>, { product }: AddProduct): Observable<void> {
    this.emitLoadingStart();
    return this.httpClient.post<Product>(this.URL, { ...product }).pipe(
      delay(400),
      tap(() => this.emitLoadingEnd()),
      switchMap(({ id }) => ctx.dispatch(new SetProducts([{  ...product, ...OWNER_INFO, id }])))
    );
  }

  @Action(EditProduct)
  editProduct(ctx: StateContext<ProductsStateModel>, { product }: EditProduct): Observable<void> {
    this.emitLoadingStart();
    return this.httpClient.put<Product>(`${ this.URL }/${ product.id }`, { ...product }).pipe(
      delay(400),
      tap(() => this.emitLoadingEnd()),
      switchMap(updatedProduct => ctx.dispatch(new SetProducts([updatedProduct])))
    );
  }

  @Action(DeleteProduct)
  deleteProduct(ctx: StateContext<ProductsStateModel>, { id }: DeleteProduct): Observable<void> {
    this.emitLoadingStart();
    return this.httpClient.delete<null>(`${ this.URL }/${ id }`).pipe(
      delay(400),
      tap(() => this.emitLoadingEnd()),
      switchMap(() => ctx.dispatch(new DeleteProductSuccess(id))),
      catchError(() => ctx.dispatch(new DeleteProductFail()))
    );
  }

  @Action(DeleteProductSuccess)
  deleteProductSuccess(ctx: StateContext<ProductsStateModel>, { id }: DeleteProduct): void {
    const state = ctx.getState();
    const productsIds = state.productsIds.filter(productId => productId !== id);
    ctx.patchState({ productsIds });
  }

  private emitLoadingStart(): void {
    ProductsState.isLoading$.next(true);
  }

  private emitLoadingEnd(): void {
    ProductsState.isLoading$.next(false);
  }
}
