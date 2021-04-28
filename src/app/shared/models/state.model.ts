import {OwnersStateModel} from './owners-state.model';
import {ProductsStateModel} from './products-state.model';


export interface StateModel {
  products: ProductsStateModel;
  owners: OwnersStateModel;
}
