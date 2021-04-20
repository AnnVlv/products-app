import {Injectable} from '@angular/core';
import {Action, State, StateContext} from '@ngxs/store';
import {ProductsStateModel} from '../models/products-state.model';
import {ProductsService} from '../services/products.service';
import {AddProduct, CalcTotal, DeleteProduct, EditProduct, GetProductById, GetProducts} from './product.actions';
import {mergeMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Product} from '../models/product.model';


@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    products: [],
    total: 0
  }
})
@Injectable()
export class ProductsState {
  constructor(private productsService: ProductsService) {}

  @Action(GetProducts)
  getProducts(ctx: StateContext<ProductsStateModel>): Observable<Product[]> {
    return this.productsService.get().pipe(
      tap(products => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          products
        });
        ctx.dispatch(new CalcTotal());
      })
    );
  }

  @Action(GetProductById)
  getProductById(ctx: StateContext<ProductsStateModel>, { id }: { id: number }): Observable<Product> {
    return this.productsService.getById(id).pipe(
      tap(product => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          products: [product]
        });
        ctx.dispatch(new CalcTotal());
      })
    );
  }

  @Action(CalcTotal)
  calcTotal(ctx: StateContext<ProductsStateModel>): void {
    const state = ctx.getState();
    const newState = {
      ...state,
      products: [
        ...state.products.map(product => ({
          ...product,
          total: product.price * product.count
        }))
      ],
    };
    newState.total = newState.products.reduce((total, product) => total + product.total, 0);
    ctx.setState(newState);
  }

  @Action(AddProduct)
  addProduct(ctx: StateContext<ProductsStateModel>, { product }: { product: Product }): Observable<void> {
    return this.productsService.add(product).pipe(
      mergeMap(() => ctx.dispatch(new GetProducts()))
    );
  }

  @Action(EditProduct)
  editProduct(ctx: StateContext<ProductsStateModel>, { product }: { product: Product }): Observable<void> {
    return this.productsService.edit(product).pipe(
      mergeMap(() => ctx.dispatch(new GetProducts()))
    );
  }

  @Action(DeleteProduct)
  deleteProduct(ctx: StateContext<ProductsStateModel>, { id }: { id: number }): Observable<void> {
    return this.productsService.delete(id).pipe(
      mergeMap(() => ctx.dispatch(new GetProducts()))
    );
  }
}
