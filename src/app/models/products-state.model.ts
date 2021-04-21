import {Products} from './products.model';
import {Owners} from './owners.model';


export interface ProductsStateModel {
  productsIds: number[];
  products: Products;
  ownersIds: number[];
  owners: Owners;
}
