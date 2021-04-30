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
  setProducts(ctx: StateContext<ProductStateModel>, { entities }: SetProducts): void {
    const state = ctx.getState();

    const ids = [...new Set([
      ...state.ids,
      ...entities.map(entity => entity.id)
    ])];

    const { owners, newEntities } = entities.reduce<{
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
  setSelectedId(ctx: StateContext<ProductStateModel>, { id }: SetSelectedId): void {
    ctx.patchState({
      selectedId: id
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
  getProductsSuccess(ctx: StateContext<ProductStateModel>, { entities }: GetProductsSuccess): void {
    ctx.dispatch(new SetProducts(entities));
  }

  @Action(GetProductById)
  getProductById(ctx: StateContext<ProductStateModel>, { id }: GetProductById): Observable<void> {
    ctx.dispatch(new SetSelectedId(id));
    return this.httpClient.get<Product>(`${ this.URL }/${ id }`).pipe(
      delay(400),
      switchMap(entity => ctx.dispatch(new GetProductByIdSuccess(entity))),
      catchError(() => ctx.dispatch(new GetProductByIdFail()))
    );
  }

  @Action(GetProductByIdSuccess)
  getProductByIdSuccess(ctx: StateContext<ProductStateModel>, { entity }: GetProductByIdSuccess): void {
    ctx.dispatch(new SetProducts([entity]));
  }

  @Action(AddProduct)
  addProduct(ctx: StateContext<ProductStateModel>, { entity }: AddProduct): Observable<void> {
    return this.httpClient.post<Product>(this.URL, { ...entity }).pipe(
      delay(400),
      switchMap(({ id }) => ctx.dispatch(new AddProductSuccess({ ...entity, id }))),
      catchError(() => ctx.dispatch(new AddProductFail()))
    );
  }

  @Action(AddProductSuccess)
  addProductSuccess(ctx: StateContext<ProductStateModel>, { entity }: AddProduct): void {
    ctx.dispatch(new SetProducts([entity]));
  }

  @Action(EditProduct)
  editProduct(ctx: StateContext<ProductStateModel>, { entity }: EditProduct): Observable<void> {
    return this.httpClient.put<Product>(`${ this.URL }/${ entity.id }`, { ...entity }).pipe(
      delay(400),
      switchMap(updatedEntity => ctx.dispatch(new EditProductSuccess(updatedEntity))),
      catchError(() => ctx.dispatch(new EditProductFail()))
    );
  }

  @Action(EditProductSuccess)
  editProductSuccess(ctx: StateContext<ProductStateModel>, { entity }: EditProductSuccess): void {
    ctx.dispatch(new SetProducts([entity]));
  }

  @Action(DeleteProduct)
  deleteProduct(ctx: StateContext<ProductStateModel>, { id }: DeleteProduct): Observable<void> {
    return this.httpClient.delete<null>(`${ this.URL }/${ id }`).pipe(
      delay(400),
      switchMap(() => ctx.dispatch(new DeleteProductSuccess(id))),
      catchError(() => ctx.dispatch(new DeleteProductFail()))
    );
  }

  @Action(DeleteProductSuccess)
  deleteProductSuccess(ctx: StateContext<ProductStateModel>, { id }: DeleteProduct): void {
    const state = ctx.getState();
    const ids = state.ids.filter(entityId => entityId !== id);
    ctx.patchState({ ids });
  }
}
