import {Product} from './product.model';


export interface ProductsStateModel {
  productsIds: number[];
  products: {
    [key: number]: Product;
  };
}
