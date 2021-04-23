import {Injectable} from '@angular/core';
import {Action, State, StateContext} from '@ngxs/store';
import {ProductsService} from '../../services/products.service';
import {AddProduct, DeleteProduct, EditProduct, GetProductById, GetProducts, SetProducts} from './product.actions';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Owner, Product, ProductsStateModel} from '../../models';
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
  setProducts(ctx: StateContext<ProductsStateModel>, { products }: { products: Product[] }): void {
    const state = ctx.getState();

    const productsIds = [...new Set([
      ...products.map(product => product.id),
      ...state.productsIds
    ])];

    const { owners, newProducts } = products.reduce((acc, product) => {
      const { owner, ...newProduct } = product;
      return {
        ...acc,
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
      owners: [] as Owner[],
      newProducts: {} as { [key: number]: Product }
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
  getProducts(ctx: StateContext<ProductsStateModel>): Observable<Product[]> {
    return this.productsService.get().pipe(
      tap(products => {
        ctx.dispatch(new SetProducts(products));
      })
    );
  }

  @Action(GetProductById)
  getProductById(ctx: StateContext<ProductsStateModel>, { id }: { id: number }): Observable<Product> {
    return this.productsService.getById(id).pipe(
      tap(product => {
        ctx.dispatch(new SetProducts([product]));
      })
    );
  }

  @Action(AddProduct)
  addProduct(ctx: StateContext<ProductsStateModel>, { product }: { product: Product }): Observable<Product> {
    return this.productsService.add(product).pipe(
      tap(newProduct => {
        ctx.dispatch(new SetProducts([newProduct]));
      })
    );
  }

  @Action(EditProduct)
  editProduct(ctx: StateContext<ProductsStateModel>, { product }: { product: Product }): Observable<Product> {
    return this.productsService.edit(product).pipe(
      tap(updatedProduct => {
        ctx.dispatch(new SetProducts([updatedProduct]));
      })
    );
  }

  @Action(DeleteProduct)
  deleteProduct(ctx: StateContext<ProductsStateModel>, { id }: { id: number }): Observable<void> {
    return this.productsService.delete(id).pipe(
      tap(() => {
        const state = ctx.getState();
        const productsIds = state.productsIds.filter(productId => productId !== id);
        ctx.patchState({ productsIds });
      })
    );
  }
}
