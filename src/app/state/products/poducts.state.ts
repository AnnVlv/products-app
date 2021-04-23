import {Injectable} from '@angular/core';
import {Action, State, StateContext} from '@ngxs/store';
import {ProductsService} from '../../services/products.service';
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
import {catchError, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Owner, ProductsStateModel} from '../../models';
import {SetOwners} from '../owners/owners.actions';


@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    productsIds: [],
    products: {}
  }
})
@Injectable()
export class ProductsState {
  constructor(private productsService: ProductsService) {}

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
    return this.productsService.get().pipe(
      switchMap(products => ctx.dispatch(new SetProducts(products)))
    );
  }

  @Action(GetProductById)
  getProductById(ctx: StateContext<ProductsStateModel>, { id }: GetProductById): Observable<void> {
    return this.productsService.getById(id).pipe(
      switchMap(product => ctx.dispatch(new SetProducts([product])))
    );
  }

  @Action(AddProduct)
  addProduct(ctx: StateContext<ProductsStateModel>, { product }: AddProduct): Observable<void> {
    return this.productsService.add(product).pipe(
      switchMap(newProduct => ctx.dispatch(new SetProducts([newProduct])))
    );
  }

  @Action(EditProduct)
  editProduct(ctx: StateContext<ProductsStateModel>, { product }: EditProduct): Observable<void> {
    return this.productsService.edit(product).pipe(
      switchMap(updatedProduct => ctx.dispatch(new SetProducts([updatedProduct])))
    );
  }

  @Action(DeleteProduct)
  deleteProduct(ctx: StateContext<ProductsStateModel>, { id }: DeleteProduct): Observable<void> {
    return this.productsService.delete(id).pipe(
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
}
