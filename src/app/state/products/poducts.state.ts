import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {ProductsService} from '../../services/products.service';
import {AddProduct, DeleteProduct, EditProduct, GetProductById, GetProducts, SetProducts} from './product.actions';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Product, ProductsStateModel} from '../../models';
import {CheckOwnersAfterProductDelete, SetOwners} from '../owners/owners.actions';


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

  @Selector([ProductsState])
  static total({ products, productsIds }: ProductsStateModel): number {
    return productsIds.reduce((total, id) => total + products[id].total, 0);
  }

  @Selector([ProductsState])
  static products({ products, productsIds }: ProductsStateModel): Product[] {
    return productsIds.map(productId => products[productId]);
  }

  @Action(SetProducts)
  setProducts(ctx: StateContext<ProductsStateModel>, { products, toClean }: { products: Product[],  toClean: boolean }): void {
    const state = ctx.getState();

    let productIds = [];
    let productsObj = {};
    if (!toClean) {
      productIds = [ ...state.productsIds ];
      productsObj = { ...state.products };
    }

    products.forEach(product => {
      const productToSave = { ...product };
      delete productToSave.owner;
      productsObj[product.id] = productToSave;
      productsObj[product.id].total = product.price *  product.count;
    });

    ctx.setState({
      ...state,
      productsIds: [
        ...productIds,
        ...products.map(product => product.id)
      ],
      products: productsObj
    });
    console.log(ctx.getState());

    ctx.dispatch(new SetOwners(products, toClean));
  }

  @Action(GetProducts)
  getProducts(ctx: StateContext<ProductsStateModel>): Observable<Product[]> {
    return this.productsService.get().pipe(
      tap(products => {
        ctx.dispatch(new SetProducts(products, true));
      })
    );
  }

  @Action(GetProductById)
  getProductById(ctx: StateContext<ProductsStateModel>, { id }: { id: number }): Observable<Product> {
    return this.productsService.getById(id).pipe(
      tap(product => {
        ctx.dispatch(new SetProducts([product], true));
      })
    );
  }

  @Action(AddProduct)
  addProduct(ctx: StateContext<ProductsStateModel>, { product }: { product: Product }): Observable<Product> {
    return this.productsService.add(product).pipe(
      tap(newProduct => {
        ctx.dispatch(new SetProducts([newProduct], false));
      })
    );
  }

  @Action(EditProduct)
  editProduct(ctx: StateContext<ProductsStateModel>, { product }: { product: Product }): Observable<Product> {
    return this.productsService.edit(product).pipe(
      tap(updatedProduct => {
        ctx.dispatch(new SetProducts([updatedProduct], false));
      })
    );
  }

  @Action(DeleteProduct)
  deleteProduct(ctx: StateContext<ProductsStateModel>, { id }: { id: number }): Observable<void> {
    return this.productsService.delete(id).pipe(
      tap(() => {
        const state = ctx.getState();

        const productToDelete = state.products[id];
        const productsIds = state.productsIds.filter(productId => productId !== id);
        const products = { ...state.products };
        delete products[id];

        ctx.setState({ ...state, productsIds, products });
        console.log(ctx.getState());
        ctx.dispatch(new CheckOwnersAfterProductDelete(productToDelete));
      })
    );
  }
}
