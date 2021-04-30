import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {delay, mapTo} from 'rxjs/operators';
import {Action, State, StateContext} from '@ngxs/store';
import {createRequestAction} from 'ngxs-requests-plugin';

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
import {ProductsGetRequestState} from './products-get-request.state';
import {ProductGetRequestState} from './product-get-request.state';
import {ProductPostRequestState} from './product-post-request.state';
import {ProductDeleteRequestState} from './product-delete-request.state';
import {ProductPutRequestState} from './product-put-request.state';


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
    const request = this.httpClient.get<Product[]>(this.URL).pipe(delay(400));
    return ctx.dispatch(createRequestAction({
      state: ProductsGetRequestState,
      request,
      successAction: GetProductsSuccess,
      failAction: GetProductsFail
    }));
  }

  @Action(GetProductsSuccess)
  getProductsSuccess(ctx: StateContext<ProductStateModel>, payload: GetProductsSuccess): void {
    ctx.dispatch(new SetProducts(payload.entities));
  }

  @Action(GetProductById)
  getProductById(ctx: StateContext<ProductStateModel>, payload: GetProductById): Observable<void> {
    const request = this.httpClient.get<Product>(`${ this.URL }/${ payload.id }`).pipe(delay(400));
    return ctx.dispatch(createRequestAction({
      state: ProductGetRequestState,
      request,
      successAction: GetProductByIdSuccess,
      failAction: GetProductByIdFail
    }));
  }

  @Action(GetProductByIdSuccess)
  getProductByIdSuccess(ctx: StateContext<ProductStateModel>, payload: GetProductByIdSuccess): void {
    ctx.dispatch(new SetSelectedId(payload.entity.id));
    ctx.dispatch(new SetProducts([payload.entity]));
  }

  @Action(AddProduct)
  addProduct(ctx: StateContext<ProductStateModel>, payload: AddProduct): Observable<void> {
    const request = this.httpClient.post<Product>(this.URL, { ...payload.entity }).pipe(delay(400));
    return ctx.dispatch(createRequestAction({
      state: ProductPostRequestState,
      request,
      successAction: AddProductSuccess,
      failAction: AddProductFail
    }));
  }

  @Action(AddProductSuccess)
  addProductSuccess(ctx: StateContext<ProductStateModel>, payload: AddProduct): void {
    ctx.dispatch(new SetProducts([payload.entity]));
  }

  @Action(EditProduct)
  editProduct(ctx: StateContext<ProductStateModel>, payload: EditProduct): Observable<void> {
    const request = this.httpClient.put<Product>(`${ this.URL }/${ payload.entity.id }`, {
      ...payload.entity
    }).pipe(delay(400));
    return ctx.dispatch(createRequestAction({
      state: ProductPutRequestState,
      request,
      successAction: EditProductSuccess,
      failAction: EditProductFail
    }));
  }

  @Action(EditProductSuccess)
  editProductSuccess(ctx: StateContext<ProductStateModel>, payload: EditProductSuccess): void {
    ctx.dispatch(new SetProducts([payload.entity]));
  }

  @Action(DeleteProduct)
  deleteProduct(ctx: StateContext<ProductStateModel>, payload: DeleteProduct): Observable<void> {
    const request = this.httpClient.delete<null>(`${ this.URL }/${ payload.id }`).pipe(
      delay(400),
      mapTo(payload.id)
    );
    return ctx.dispatch(createRequestAction({
      state: ProductDeleteRequestState,
      request,
      successAction: DeleteProductSuccess,
      failAction: DeleteProductFail
    }));
  }

  @Action(DeleteProductSuccess)
  deleteProductSuccess(ctx: StateContext<ProductStateModel>, payload: DeleteProduct): void {
    const state = ctx.getState();
    const ids = state.ids.filter(entityId => entityId !== payload.id);
    ctx.patchState({ ids });
  }
}
