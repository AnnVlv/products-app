import {Product} from '../models/product.model';


export class GetProducts {
  static readonly type = '[Product] Get Products';
}

export class GetProductById {
  static readonly type = '[Product] Get Product By Id';
  constructor(public id: number) {}
}

export class CalcTotal {
  static readonly type = '[Product] Calc Total';
}

export class AddProduct {
  static readonly type = '[Product] Add Product';
  constructor(public product: Product) {}
}

export class EditProduct {
  static readonly type = '[Product] Edit Product';
  constructor(public product: Product) {}
}

export class DeleteProduct {
  static readonly type = '[Product] Delete Product';
  constructor(public id: number) {}
}
