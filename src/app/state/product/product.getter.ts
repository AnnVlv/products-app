import {Selector} from '@ngxs/store';

import {Product} from '../../shared/models';
import {ProductState, ProductStateModel} from './poduct.state';


export class ProductStateGetter {
  @Selector([ProductState])
  static total({ entities, ids }: ProductStateModel): number {
    return ids.reduce((total, id) => total + entities[id].total, 0);
  }

  @Selector([ProductState])
  static products({ entities, ids }: ProductStateModel): Product[] {
    return ids.map(id => entities[id]);
  }

  @Selector([ProductState])
  static selectedProduct({ entities, selectedId }: ProductStateModel): Product {
    return selectedId ? entities[selectedId] : null;
  }
}
