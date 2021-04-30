import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError, delay, switchMap} from 'rxjs/operators';
import {Action, State, StateContext} from '@ngxs/store';

import {
  AddProduct, AddProductFail, AddProductSuccess,
  DeleteProduct,
  DeleteProductFail,
  DeleteProductSuccess,
  EditProduct, EditProductFail, EditProductSuccess,
  GetProductById, GetProductByIdFail, GetProductByIdSuccess,
  GetProducts, GetProductsFail, GetProductsSuccess,
  SetProducts, SetSelectedId
} from './product.actions';
import {Owner, Product} from '../../shared/models';
import {SetOwners} from '../owner/owner.actions';


export interface ProductStateModel {
  ids: number[];
  entities: {
    [key: number]: Product;
  };
  selectedId: number;
}


@State<ProductStateModel>({
  name: 'products',
  defaults: {
    ids: [],
    entities: {},
    selectedId: null
  }
})
@Injectable()
export class ProductState {
  private URL = `products`;

  constructor(
    private httpClient: HttpClient
  ) { }

  @Action(SetProducts)
  setProducts(ctx: StateContext<ProductStateModel>, payload: SetProducts): void {
    const state = ctx.getState();

    const ids = [...new Set([
      ...state.ids,
      ...payload.entities.map(entity => entity.id)
    ])];

    const { owners, newEntities } = payload.entities.reduce<{
      owners: Owner[],
      newEntities: ProductStateModel['entities']
    }>((acc, product) => {
      const { owner, ...newEntity } = product;
      return {
        owners: [
          ...acc.owners,
          owner
        ],
        newEntities: {
          ...acc.newEntities,
          [newEntity.id]: {
            ...newEntity,
            total: product.price * product.count
          }
        }
      };
    }, {
      owners: [],
      newEntities: {}
    });

    ctx.patchState({
      ids,
      entities: {
        ...state.entities,
        ...newEntities
      }
    });

    ctx.dispatch(new SetOwners(owners));
  }

  @Action(SetSelectedId)
  setSelectedId(ctx: StateContext<ProductStateModel>, payload: SetSelectedId): void {
    ctx.patchState({
      selectedId: payload.id
    });
  }

  @Action(GetProducts)
  getProducts(ctx: StateContext<ProductStateModel>): Observable<void> {
    return this.httpClient.get<Product[]>(this.URL).pipe(
      delay(400),
      switchMap(entities => ctx.dispatch(new GetProductsSuccess(entities))),
      catchError(() => ctx.dispatch(new GetProductsFail()))
    );
  }

  @Action(GetProductsSuccess)
  getProductsSuccess(ctx: StateContext<ProductStateModel>, payload: GetProductsSuccess): void {
    ctx.dispatch(new SetProducts(payload.entities));
  }

  @Action(GetProductById)
  getProductById(ctx: StateContext<ProductStateModel>, payload: GetProductById): Observable<void> {
    return this.httpClient.get<Product>(`${ this.URL }/${ payload.id }`).pipe(
      delay(400),
      switchMap(entity => ctx.dispatch(new GetProductByIdSuccess(entity))),
      catchError(() => ctx.dispatch(new GetProductByIdFail()))
    );
  }

  @Action(GetProductByIdSuccess)
  getProductByIdSuccess(ctx: StateContext<ProductStateModel>, payload: GetProductByIdSuccess): void {
    ctx.dispatch(new SetSelectedId(payload.entity.id));
    ctx.dispatch(new SetProducts([payload.entity]));
  }

  @Action(AddProduct)
  addProduct(ctx: StateContext<ProductStateModel>, payload: AddProduct): Observable<void> {
    return this.httpClient.post<Product>(this.URL, { ...payload.entity }).pipe(
      delay(400),
      switchMap(({ id }) => ctx.dispatch(new AddProductSuccess({ ...payload.entity, id }))),
      catchError(() => ctx.dispatch(new AddProductFail()))
    );
  }

  @Action(AddProductSuccess)
  addProductSuccess(ctx: StateContext<ProductStateModel>, payload: AddProduct): void {
    ctx.dispatch(new SetProducts([payload.entity]));
  }

  @Action(EditProduct)
  editProduct(ctx: StateContext<ProductStateModel>, payload: EditProduct): Observable<void> {
    return this.httpClient.put<Product>(`${ this.URL }/${ payload.entity.id }`, {
      ...payload.entity
    }).pipe(
      delay(400),
      switchMap(updatedEntity => ctx.dispatch(new EditProductSuccess(updatedEntity))),
      catchError(() => ctx.dispatch(new EditProductFail()))
    );
  }

  @Action(EditProductSuccess)
  editProductSuccess(ctx: StateContext<ProductStateModel>, payload: EditProductSuccess): void {
    ctx.dispatch(new SetProducts([payload.entity]));
  }

  @Action(DeleteProduct)
  deleteProduct(ctx: StateContext<ProductStateModel>, payload: DeleteProduct): Observable<void> {
    return this.httpClient.delete<null>(`${ this.URL }/${ payload.id }`).pipe(
      delay(400),
      switchMap(() => ctx.dispatch(new DeleteProductSuccess(payload.id))),
      catchError(() => ctx.dispatch(new DeleteProductFail()))
    );
  }

  @Action(DeleteProductSuccess)
  deleteProductSuccess(ctx: StateContext<ProductStateModel>, payload: DeleteProduct): void {
    const state = ctx.getState();
    const ids = state.ids.filter(entityId => entityId !== payload.id);
    ctx.patchState({ ids });
  }
}
