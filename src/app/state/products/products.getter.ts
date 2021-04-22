import {Product, ProductsStateModel} from '../../models';
import {ProductsState} from './poducts.state';
import {Selector} from '@ngxs/store';


export class ProductsStateGetter {
  @Selector([ProductsState])
  static total({ products, productsIds }: ProductsStateModel): number {
    return productsIds.reduce((total, id) => total + products[id].total, 0);
  }

  @Selector([ProductsState])
  static products({ products, productsIds }: ProductsStateModel): Product[] {
    return productsIds.map(productId => products[productId]);
  }
}
