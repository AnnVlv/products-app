import {Selector} from '@ngxs/store';

import {Product, ProductsStateModel} from '../../shared/models';
import {ProductsState} from './poducts.state';


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
